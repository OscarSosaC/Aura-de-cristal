import {React, useState,useEffect} from 'react'
import StylesCalendario from '../../styles/CalendarioBuscador.module.css'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Importa el ícono de flecha
import CloseIcon from '@mui/icons-material/Close';
import {useProductosStates} from "../../utils/Context"

function CalendarioBuscador({ onClose }) {
  const [fecha, setFecha] = useState(new Date ());
  const [mostrarError, setmostrarError] = useState(false);
  const [mostrarExito, setmostrarExito] = useState(false);
  const {state,dispatch} = useProductosStates();

  const formatoFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, '0'); // Asegura 2 dígitos para el día
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura 2 dígitos para el mes
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const cambiarFecha = (newDate) => {
    setFecha(newDate);
  };


  const guardarFechas = (event) => {
    event.preventDefault();
    
    if(new Date(fecha[0]).toDateString()  !== "Invalid Date"){
      setmostrarError(false);
      setmostrarExito(true);
      const diaInicio=formatoFecha(new Date(fecha[0]));
      const diaFin = formatoFecha(new Date(fecha[1]));
      console.log("inicial",diaInicio);
      console.log("final",diaFin);
      dispatch({type:"ADD_FECHA_INICIAL", payload:diaInicio});
      dispatch({type:"ADD_FECHA_FINAL", payload:diaFin});
    }else{
      setmostrarError(true);
      setmostrarExito(false);
    }

  }

  const reestablecer = (event) =>{
    event.preventDefault();
    dispatch({type:"REMOVE_FECHA_INICIAL", payload:null});
    dispatch({type:"REMOVE_FECHA_FINAL", payload:null});
  }
  console.log(fecha)

  //calendario movil
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600); // Estado para detectar si es móvil

  // Actualizar el estado en caso de cambio de tamaño de ventana
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={StylesCalendario.divPrincipal}>
      <div className={StylesCalendario.divIconoCerrar}>
        <button onClick={onClose} className={StylesCalendario.botonIconoCerrar}>
          <CloseIcon className={StylesCalendario.iconoCerrar} />
        </button>
        <button onClick={reestablecer} className={StylesCalendario.botonRestablecer}>Restablecer</button>
        <button className={StylesCalendario.botonGuardarFecha}  onClick={guardarFechas}>Confirmar</button>
      </div>
      {mostrarError && (<p className={StylesCalendario.mensajeError}>Debe Seleccionar una fecha inicial y una fecha final</p>)}
      {mostrarExito && (<p className={StylesCalendario.mensajeExito}>Se ha guardado la fecha seleccionada</p>)}
      {new Date(fecha[0]).toDateString() !== "Invalid Date" ? (
        <div className={StylesCalendario.titulo}>
          <p className={StylesCalendario.fechasSeleccionada}>
            {
            formatoFecha(new Date(fecha[0]))}
          </p>
          <ArrowForwardIcon /> {/* Usa el ícono de flecha */}
          <p className={StylesCalendario.fechasSeleccionada}>
            {
            formatoFecha(new Date(fecha[1]))}
          </p>
        </div>
			):
      (
        <div className={StylesCalendario.titulo}>
          <p className={StylesCalendario.fechasSeleccionada}>
            {state.fechaInicial ===null ? 
            ('DD/MM/YYYY'):
            (state.fechaInicial)}
          </p>
          <ArrowForwardIcon /> {/* Usa el ícono de flecha */}
          <p className={StylesCalendario.fechasSeleccionada}>
          {state.fechaFinal ===null ? 
            ('DD/MM/YYYY'):
            (state.fechaFinal)}
          </p>
        </div>
			)
      }
      <Calendar
        showDoubleView={!isMobile} // Mostrar dos meses solo si no es móvil}
        returnValue={fecha}
        selectRange={true}
        onChange={cambiarFecha}
        locale = 'es-ES'
      />
    </div>
  )
}

export default CalendarioBuscador