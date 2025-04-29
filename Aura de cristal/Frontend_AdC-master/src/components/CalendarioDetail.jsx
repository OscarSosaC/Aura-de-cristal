// CalendarioDetail.jsx
import { React, useState, useEffect } from 'react'
import StylesCalendario from '../styles/CalendarioDetail.module.css'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { useProductosStates } from "../utils/Context"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from "react-router-dom";

function CalendarioDetail({ noDisponibles, isAuthenticated, userReservas = [] }) {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState(new Date());
  const [mostrarError, setmostrarError] = useState(false);
  const [mostrarErrorFechaNoDisponible, setmostrarErrorFechaNoDisponible] = useState(false);
  const [mostrarExito, setmostrarExito] = useState(false);
  const { state, dispatch } = useProductosStates();
  const [mostrarCalendario, setmostrarCalendario] = useState(false);

  let blackoutDates = [];

  const listaReservas = [...noDisponibles, ...userReservas];

  const obtenerDias = (fechaInicio, fechaFin) => {
    // Ajuste a las fechas
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    fechaFin.setDate(fechaFin.getDate() + 1);

    const date = new Date(fechaInicio.getTime());
    while (date <= fechaFin) {
      if(!blackoutDates.includes(date.toDateString())){
        blackoutDates.push(date.toDateString());
      }
      date.setDate(date.getDate() + 1);
    }
    return blackoutDates;
  }

  listaReservas.forEach(e=>{
    obtenerDias(new Date(e.fechaInicio),new Date(e.fechaFin))
  })

  const handleCalendario = () => {
    // Si el usuario no está autenticado, mostramos alerta y redirigimos a /login
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'No estás logueado',
        text: 'Debes iniciar sesión para seleccionar fechas.',
        confirmButtonText: 'Ok'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    setmostrarCalendario(!mostrarCalendario)
    if (!mostrarCalendario) {
      setmostrarErrorFechaNoDisponible(false)
      setmostrarError(false);
      setmostrarExito(false);
    }
  };

  const validateDisabled = (date) => {
    return blackoutDates.includes(date.toDateString())
  }

  const formatoFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, '0'); 
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const guardarFechas = () => {
    if (Array.isArray(fecha) && new Date(fecha[0]).toDateString() !== "Invalid Date") {
      const diaInicio = new Date(fecha[0]);
      const diaFin = new Date(fecha[1]);

      // Validar si rango es inválido
      if (rangoInvalido(diaInicio, diaFin)) {
        setmostrarError(false);
        setmostrarExito(false);
        setmostrarErrorFechaNoDisponible(true);
      } else {
        setmostrarError(false);
        setmostrarExito(true);
        dispatch({ type: "ADD_FECHA_INICIAL_RESERVA", payload: formatoFecha(diaInicio) });
        dispatch({ type: "ADD_FECHA_FINAL_RESERVA", payload: formatoFecha(diaFin) });
      }
    } else {
      setmostrarError(true);
      setmostrarExito(false);
    }

    handleCalendario();
  }

  const rangoInvalido = (inicio, fin) => {
    let dateCheck = new Date(inicio.getTime());
    while (dateCheck <= fin) {
      if (blackoutDates.includes(dateCheck.toDateString())) {
        return true;
      }
      dateCheck.setDate(dateCheck.getDate() + 1);
    }
    return false;
  }

  // Al montar, si ya hay fechas seleccionadas, validar si son válidas
  useEffect(() => {
    if (state.fechaInicialReserva && state.fechaFinalReserva) {
      const [diaI, mesI, anioI] = state.fechaInicialReserva.split('/').map(Number);
      const [diaF, mesF, anioF] = state.fechaFinalReserva.split('/').map(Number);
      const fechaInicio = new Date(anioI, mesI - 1, diaI);
      const fechaFin = new Date(anioF, mesF - 1, diaF);

      if (rangoInvalido(fechaInicio, fechaFin)) {
        Swal.fire({
          icon: 'warning',
          title: 'Rango inválido',
          text: 'Las fechas seleccionadas previamente contienen días no disponibles. Por favor seleccione un nuevo rango.',
          confirmButtonText: 'Ok'
        }).then(() => {
          dispatch({ type: "ADD_FECHA_INICIAL_RESERVA", payload: null });
          dispatch({ type: "ADD_FECHA_FINAL_RESERVA", payload: null });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReservas, noDisponibles]);

  return (
    <div className={StylesCalendario.divPrincipal}>
      {mostrarError && (<p className={StylesCalendario.mensajeError}>Debe Seleccionar una fecha inicial y una fecha final</p>)}
      {mostrarErrorFechaNoDisponible && (<p className={StylesCalendario.mensajeError}>El rango seleccionado contiene uno o más días no disponibles</p>)}
      {mostrarExito && (<p className={StylesCalendario.mensajeExito}>Se ha guardado la fecha seleccionada</p>)}

      <div className={StylesCalendario.titulo} >
        <button className={StylesCalendario.botonFechas} onClick={handleCalendario}>
          <p className={StylesCalendario.fechasSeleccionada}> Desde
            <span className={StylesCalendario.fechas}>
            {state.fechaInicialReserva === null ?
              ('DD/MM/YYYY') :
              (state.fechaInicialReserva)}</span>
          </p>
        </button>
        <ArrowForwardIcon />
        <button className={StylesCalendario.botonFechas} onClick={handleCalendario}>
          <p className={StylesCalendario.fechasSeleccionada}>Hasta
            <span className={StylesCalendario.fechas}>
            {state.fechaFinalReserva === null ?
              ('DD/MM/YYYY') :
              (state.fechaFinalReserva)}</span>
          </p>
        </button>
      </div>
      {mostrarCalendario ?
        <>
          <div className={StylesCalendario.divIconoCerrar}>
            <button onClick={handleCalendario} className={StylesCalendario.botonIconoCerrar}>
              <CloseIcon className={StylesCalendario.iconoCerrar} />
            </button>
            <button className={StylesCalendario.botonGuardarFecha} onClick={guardarFechas}>Confirmar</button>
          </div>
          <div className={StylesCalendario.calendario}>
            <Calendar
              showDoubleView={true}
              returnValue='range'
              selectRange = {true}
              onChange={(newDate) => setFecha(newDate)}
              locale='es-ES'
              tileDisabled={({ date }) => validateDisabled(date)}
            />
          </div>
        </> : <></>}
    </div>
  )
}

export default CalendarioDetail;
