// Detail.jsx
import { useNavigate, useLocation, Link } from "react-router-dom";
import StylesDetail from '../styles/Detail.module.css';
import { useMediaQuery, useTheme } from '@mui/material';
import { useProductosStates } from "../utils/Context";
import { useState, useEffect, useMemo } from "react";
import Caracteristicas from "../components/Caracteristicas/Caractiristicas";
import CalendarioDetail from "../components/CalendarioDetail";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { obtenerReservasPorUsuario } from "../services/reservas.service";


const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { state, dispatch } = useProductosStates(); // aquí tenemos (fechaInicial, fechaFinal)
  const producto = location.state.producto;
  const esRecomendacion = location.state.esRecomendacion;
  console.log('pro', producto);
  console.log('reco', esRecomendacion);
  
  const politicasDelProducto = useMemo(() => (
    <div className={StylesDetail.contenedorPoliticasDelProducto}>
      <p className={StylesDetail.tituloPoliticasDelProducto}>
        Politicas del producto
      </p>
      <a
        className={StylesDetail.enlacePoliticasDelProducto} 
        download="guia-de-cuidado-de-producto.pdf"
        href="https://aura-de-cristal.s3.us-east-1.amazonaws.com/politicas-del-producto/guia-de-cuidado-de-producto.pdf"
        target="_blank">
          Guia de Cuidado de Producto
      </a>
      <a 
        className={StylesDetail.enlacePoliticasDelProducto} 
        download="condiciones-para-la-garantia.pdf"
        href="https://aura-de-cristal.s3.us-east-1.amazonaws.com/politicas-del-producto/condiciones-para-la-garantia.pdf"
        target="_blank">
          Condiciones para la Garantia
      </a>
      <a 
        className={StylesDetail.enlacePoliticasDelProducto} 
        download="politica-de-cancelacion.pdf"
        href="https://aura-de-cristal.s3.us-east-1.amazonaws.com/politicas-del-producto/politica-de-cancelacion.pdf"
        target="_blank">
          Politica de Cancelacion
      </a>
    </div>
  ), []);
  
  // Obtenemos si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userId = localStorage.getItem("userId");

  const [userReservas, setUserReservas] = useState([]);

  useEffect(() => {
    // Si el usuario está autenticado, obtenemos sus reservas
    if (isAuthenticated && userId) {
      obtenerReservasPorUsuario(userId)
        .then(res => setUserReservas(res))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated, userId]);

  const volverHome = () => {
    if(esRecomendacion){
      navigate(-1);
    }else{
    navigate(`/listaCategorias/${producto.categoria.idCategoria}`);
    }
  }

  const handleReservar = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'No estás logueado',
        text: 'Debes iniciar sesión para realizar una reserva o seleccionar fechas.',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'elSwal'
        }
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    if (state.fechaInicialReserva === null || state.fechaFinalReserva === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Fechas no seleccionadas',
        text: 'Debe seleccionar una fecha inicial y una fecha final antes de reservar.',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'elSwal'
        }
      });
      return;
    }

    const listaReservas = [...producto.reservas, ...userReservas];
    const invalidRange = isDateRangeInvalid(state.fechaInicialReserva, state.fechaFinalReserva, listaReservas);

    if (invalidRange) {
      Swal.fire({
        icon: 'warning',
        title: 'Rango inválido',
        text: 'El rango de fechas que seleccionó contiene uno o más días no disponibles.',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'elSwal'
        }
      });
      return;
    }

    // Redirigimos a la reserva
    navigate(`/reserva/${producto.idProducto}`, { state: { producto } });
  };

  const isDateRangeInvalid = (fechaInicialStr, fechaFinalStr, listaReservas) => {
    if (!fechaInicialStr || !fechaFinalStr) return true;
    const [diaI, mesI, anioI] = fechaInicialStr.split('/').map(Number);
    const [diaF, mesF, anioF] = fechaFinalStr.split('/').map(Number);
    const fechaInicio = new Date(anioI, mesI - 1, diaI);
    const fechaFin = new Date(anioF, mesF - 1, diaF);
    let blackoutDates = getBlackoutDates(listaReservas);

    let dateCheck = new Date(fechaInicio.getTime());
    while (dateCheck <= fechaFin) {
      if (blackoutDates.includes(dateCheck.toDateString())) {
        return true;
      }
      dateCheck.setDate(dateCheck.getDate() + 1);
    }
    return false;
  }

  const getBlackoutDates = (reservas) => {
    let blackoutDates = [];
    reservas.forEach(e => {
      let fi = new Date(e.fechaInicio);
      let ff = new Date(e.fechaFin);
      fi.setDate(fi.getDate() + 1);
      ff.setDate(ff.getDate() + 1);
      const date = new Date(fi.getTime());
      while (date <= ff) {
        if (!blackoutDates.includes(date.toDateString())) {
          blackoutDates.push(date.toDateString());
        }
        date.setDate(date.getDate() + 1);
      }
    });
    return blackoutDates;
  }

  // Validamos al ingresar a Detail si las fechas ya seleccionadas globalmente siguen siendo válidas
  useEffect(() => {
    if (state.fechaInicialReserva && state.fechaFinalReserva) {
      const listaReservas = [...producto.reservas, ...userReservas];
      if (isDateRangeInvalid(state.fechaInicialReserva, state.fechaFinalReserva, listaReservas)) {
        Swal.fire({
          icon: 'warning',
          title: 'Rango inválido',
          text: 'Las fechas seleccionadas previamente contienen días no disponibles. Por favor seleccione un nuevo rango.',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'elSwal'
          }
        }).then(() => {
          dispatch({ type: "ADD_FECHA_INICIAL", payload: null });
          dispatch({ type: "ADD_FECHA_FINAL", payload: null });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReservas]);

  return (
    <>
      <a onClick={volverHome} className={StylesDetail.tituloVolver}>Volver</a>
      <section className={StylesDetail.contenedor}>
        {isMobile && (<h3 className={StylesDetail.nombre}>{producto.nombre}</h3>)}
        
        <div className={StylesDetail.contenedorImg}>
          <img src={producto.imagenes[0].url} className={StylesDetail.imgGrande} alt={producto.nombre}/>

          <div className={StylesDetail.contenedorImgPequeñas}>
            <img src={producto.imagenes[1].url} className={StylesDetail.imgPequeña} alt="imagen producto"/>
            <img src={producto.imagenes[2].url} className={StylesDetail.imgPequeña} alt="imagen producto"/>
            <img src={producto.imagenes[3].url} className={StylesDetail.imgPequeña} alt="imagen producto"/>

            <Link
              to={{
                pathname: '/gallery/' + producto.idProducto
              }}
              state={{ producto }}>
              <div className={StylesDetail.divImg}>
                <img src={producto.imagenes[0].url} className={StylesDetail.imgPequeñaOpacity} alt="imagen producto"/>
                {isMobile ? (<p className={StylesDetail.textImg}>Ver Más</p>) : (<p className={StylesDetail.textImg}>Ver todas las fotos</p>)}
              </div>
            </Link>
          </div>

          <div>
            {
                <>
                  <h4>Características:</h4>
                  <Caracteristicas idProducto={producto.idProducto}></Caracteristicas>
                </>
            }
          </div>
        </div>

        {
          isMobile ? (
            <div className={StylesDetail.contenedorDetalle}>
              <h3 className={StylesDetail.tituloDescripcion}>Descripción:</h3>
              <p className={StylesDetail.descripcion}>{producto.descripcion}</p>
              <h3 className={StylesDetail.precio}>S/.{producto.precio_alquiler}</h3>

              <CalendarioDetail
                noDisponibles={producto.reservas}
                isAuthenticated={isAuthenticated}
                userReservas={userReservas}
              />
              {isAuthenticated ? <Link
                to={{
                  pathname: '/reserva/' + producto.idProducto
                }}
                state={{ producto }}>
                <button className={StylesDetail.boton} >RESERVAR</button>

              </Link> :
                <button className={StylesDetail.boton} onClick={() => Swal.fire({
                  icon: 'warning',
                  title: 'No estás logueado',
                  text: 'Debes iniciar sesión para realizar una reserva o seleccionar fechas.',
                  confirmButtonText: 'Ok',
                  customClass: {
                    popup: 'elSwal'
                  }
                })}>RESERVAR</button>
              }
              {politicasDelProducto}
            </div>
          ) : (
            <div className={StylesDetail.contenedorDetalle}>
              <h3 className={StylesDetail.nombre}>{producto.nombre}</h3>
              <h3 className={StylesDetail.precio}>S/.{producto.precio_alquiler}</h3>
              <h3 className={StylesDetail.tituloDescripcion}>Descripción:</h3>
              <p className={StylesDetail.descripcion}>{producto.descripcion}</p>
              
              <div className={StylesDetail.contenedorReserva}>
                <CalendarioDetail 
                  noDisponibles={producto.reservas}
                  isAuthenticated={isAuthenticated}
                  userReservas={userReservas}
                />
                {isAuthenticated ? (
                  state.fechaInicialReserva !== null && state.fechaFinalReserva !== null ? (
                    <button 
                      className={StylesDetail.boton}
                      onClick={handleReservar}
                    >
                      RESERVAR
                    </button>
                  ) : (
                    <button 
                      className={StylesDetail.boton}
                      onClick={() => Swal.fire({
                        icon: 'warning',
                        title: 'Fechas no seleccionadas',
                        text: 'Debe seleccionar una fecha inicial y una fecha final antes de reservar.',
                        confirmButtonText: 'Ok',
                        customClass: {
                          popup: 'elSwal'
                        }
                      })}
                    >
                      RESERVAR
                    </button>
                  )
                ) : (
                  <button 
                    className={StylesDetail.boton}
                    onClick={() => {
                      Swal.fire({
                        icon: 'warning',
                        title: 'No estás logueado',
                        text: 'Debes iniciar sesión para realizar una reserva o seleccionar fechas.',
                        confirmButtonText: 'Ok',
                        customClass: {
                          popup: 'elSwal'
                        }
                      }).then(() => {
                        navigate('/login');
                      })
                    }}
                  >
                    RESERVAR
                  </button>
                )}
                {politicasDelProducto}
              </div>
            </div>
          )
        }
      </section>
    </>
  )
}

export default Detail;
