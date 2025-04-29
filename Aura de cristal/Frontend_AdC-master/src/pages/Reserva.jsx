import React from 'react'
import StylesReserva from '../styles/Reserva.module.css'
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { registrarReserva } from '../services/reservas.service';
import { useMediaQuery, useTheme } from '@mui/material';

function Reserva() {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const producto = location.state.producto;
    const nombre = localStorage.getItem('userNombre');
    const apellido = localStorage.getItem('userApellido');
    const email = localStorage.getItem('userEmail');
    const fechaInicialReserva = sessionStorage.getItem('fechaInicialReserva')?.replaceAll("\"", "");
    const fechaFinalReserva = sessionStorage.getItem('fechaFinalReserva')?.replaceAll("\"", "");
    const formatearFecha = (fecha) => {
        let campos = fecha.split("/")
        if (campos.length == 3) {
            return campos[2] + "-" + campos[1] + "-" + campos[0]
        }
        return fecha
    }
    const fechaInicio = new Date(formatearFecha(fechaInicialReserva)).getTime();
    const fechaFin = new Date(formatearFecha(fechaFinalReserva)).getTime();
    const diff = fechaFin - fechaInicio;
    const totalDias = (diff / (1000 * 60 * 60 * 24)) + 1;
  const navigate = useNavigate();

    const botonCancelar = () => {
        navigate(-1);
    }

    const errorEnLaReserva = (mensaje) => {
        Swal.fire({
            title: "Aura de Cristal",
            text: mensaje,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Volver",
            confirmButtonColor: '#000'
        });
    };


    const reserva = async () => {
        try {
            const response = await registrarReserva(producto.idProducto, parseInt(localStorage.getItem('userId')), formatearFecha(fechaInicialReserva), formatearFecha(fechaFinalReserva));
            
            console.log("reserva ", response)

            if (response === 404) {
                errorEnLaReserva('El id del usuario o el id del producto no existe. Por favor, contacte con soporte.');
            }else if(response.status === 400){
                errorEnLaReserva('Error en los datos enviados o las fechas seleccionadas se encuentran ocupadas. Por favor, contacte con soporte.');
            }else if(response.status === 500){
                errorEnLaReserva('Error en el servidor. Por favor, contacte con soporte.');
            }else if(response.status === 403){
                errorEnLaReserva('Por tu perfil no puedes realizar reservas. Por favor, contacte con soporte.');
            }if (response.status === 201){
                console.log('reserva exitosa')
                // Redirigir a la Página de reserva exitosa y pasar el objeto producto
                const datosReservaExitosa = {
                    producto,
                    nombreUsuario: nombre + " " + apellido,
                    emailUsuario: email,
                    fechaInicialReserva,
                    fechaFinalReserva,
                    totalPrecio: producto.precio_alquiler * totalDias
                };

                navigate('/reservaExitosa', { state: datosReservaExitosa });

            }
            else{
                console.log('otro error')
            }
        } catch (error) {
            console.log("error en reserva", error)
            errorEnLaReserva('Se ha presentando un error. Por favor, contacte con soporte.');
        }
    }

    return (
        <section className={StylesReserva.principal}>
            <p className={StylesReserva.titulo}>Confirma y reserva</p>
            <article className={StylesReserva.articulo}>
                {isMobile ? <div className={StylesReserva.div1}>
                    <img src={producto.imagenes[0].url} className={StylesReserva.imagen} />
                    <div className={StylesReserva.div1_1}>
                        <p className={StylesReserva.nombreProducto}>{producto.nombre}</p>
                        <p className={StylesReserva.descripcionProducto}>{producto.descripcion}</p>
                        <p className={StylesReserva.fechasSeleccionada}>Fechas</p>
                        <p className={StylesReserva.fechasSeleccionada}>{fechaInicialReserva + "-" + fechaFinalReserva}</p>
                    </div>
                </div> : <div className={StylesReserva.div1}>
                    <img src={producto.imagenes[0].url} className={StylesReserva.imagen} />
                    <div className={StylesReserva.div1_1}>
                        <p className={StylesReserva.nombreProducto}>{producto.nombre}</p>
                        <p className={StylesReserva.descripcionProducto}>{producto.descripcion}</p>
                    </div>
                    <div >
                        <p className={StylesReserva.fechasSeleccionada}>Fechas</p>
                        <p className={StylesReserva.fechasSeleccionada}>{fechaInicialReserva + "-" + fechaFinalReserva}</p>
                    </div>
                </div>}

                <div className={StylesReserva.div2}>
                    <p className={StylesReserva.informacion}>Información del usuario</p>
                    <div className={StylesReserva.div2_1}>
                        <p className={StylesReserva.nombre}>Nombre</p>
                        <p className={StylesReserva.datosUsuario}>{nombre + " " + apellido}</p>
                    </div>
                    <div className={StylesReserva.div2_1}>
                        <p className={StylesReserva.correo}>Correo</p>
                        <p className={StylesReserva.datosUsuario}>{email}</p>
                    </div>
                </div>

                <div className={StylesReserva.div2}>
                    <p className={StylesReserva.informacion}>Información del precio</p>
                    <div className={StylesReserva.div2_1}>
                        <p className={StylesReserva.precioDias}>{"S" + "/" + producto.precio_alquiler + " X " + totalDias + " dias"} </p>
                        <p className={StylesReserva.datosUsuario}>{"S/" + producto.precio_alquiler * totalDias}</p>
                    </div>
                </div>

                <div className={StylesReserva.div3}>
                    <div className={StylesReserva.div2_1}>
                        <p className={StylesReserva.informacion2}>Total(Soles)</p>
                        <p className={StylesReserva.datosUsuario}>{"S/" + producto.precio_alquiler * totalDias}</p>
                    </div>
                </div>
            </article>
            <div className={StylesReserva.divBotones}>
                <button className={StylesReserva.botonCancelar} onClick={botonCancelar}>Cancelar</button>
                <button className={StylesReserva.botonReservar} onClick={reserva}>Solicitar reserva</button>
            </div>
        </section>
    )
}

export default Reserva