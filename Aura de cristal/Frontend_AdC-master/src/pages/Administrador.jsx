import { useState } from "react";
import StylesAdmin from '../styles/Administrador.module.css';
import { useNavigate } from 'react-router-dom';
import { useProductosStates } from "../utils/Context";
import Swal from 'sweetalert2';

function Administrador() {
    console.log('RENDERIZANDO ADMIN')
    const { state } = useProductosStates();
    const listaProductos = state.lista;

    const navigate = useNavigate();
    const [mostrarLista, setMostrarLista] = useState(false);

    const listaProducto = () => {
        navigate('/admin/listaProductos');
    };

    const agregarProducto = () => {
        navigate('/admin/agregarProducto');
    };

    const administrarUsuarios = () => {
        navigate('/admin/user-list');
    };

    const botonMovil = () => {
        navigate('/');
    };

    const eliminarProducto = (id) => {
        Swal.fire({
            title: "Aura de Cristal",
            text: "Deseas eliminar este producto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#000',
            cancelButtonColor: '#8D3434CC'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('eliminar');
            }
        });
    };

    return (
        <>
            <section className={StylesAdmin.seccionPrincipal}>
                <div className={StylesAdmin.titulo}>Panel de Administración</div>
                <div className={StylesAdmin.botones}>
                    <button onClick={listaProducto} className={StylesAdmin.botonesPrincipales}>LISTAR PRODUCTOS</button>
                    <button onClick={agregarProducto} className={StylesAdmin.botonesPrincipales}>AGREGAR PRODUCTO</button>
                    <button onClick={administrarUsuarios} className={StylesAdmin.botonesPrincipales}>ADMINISTRAR USUARIOS</button>
                </div>
            </section>
            {mostrarLista && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>ACCIONES</th>
                            <th>CATEGORIA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>
                                    <div className="cambios-estados">
                                        <button className={StylesAdmin.botonesEditar}>Editar</button>
                                        <button onClick={() => eliminarProducto(producto.id)} className={StylesAdmin.botonesEliminar}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className={StylesAdmin.mensajeMovil}>
                <div className={StylesAdmin.fraseMovil}>
                    <span className={StylesAdmin.frase2Movil}>Atención</span>No es posible entrar al Panel de Administración desde este dispositivo.
                </div>
                <button onClick={botonMovil} className={StylesAdmin.botonMovil}>Volver a inicio</button>
            </div>
        </>
    );
}

export default Administrador;
