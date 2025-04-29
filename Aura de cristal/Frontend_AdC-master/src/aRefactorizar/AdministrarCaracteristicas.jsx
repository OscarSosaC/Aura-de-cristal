import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/AdministrarCaracteristicas.module.css';
import { useNavigate } from 'react-router-dom';

const caracteristica = [
    { id: 1, nombre: 'Material', icono: '📦' },
    { id: 2, nombre: 'Lavavajillas', icono: '🚿' },
    { id: 3, nombre: 'Dimensiones', icono: '📏' },
    { id: 4, nombre: 'Microondas', icono: '🍲' },
    { id: 5, nombre: 'Garantía', icono: '🛡️' },
    { id: 6, nombre: 'Peso', icono: '⚖️' },
];

const AdministrarCaracteristicas = () => {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1);
    };

    return (
        <div>
            {/* Botón Volver */}
            <button className={styles['volver-boton']} onClick={handleVolver}>
                ← Volver
            </button>

            {/* Contenedor principal */}
            <div className={styles['panel-administracion']}>
                <h1>LISTAR CARACTERISTICAS</h1>
                <button className={styles['agregar-boton']}>AGREGAR CARACTERISTICA</button>
                <div className={styles['caracteristicas-lista']}>
                    {caracteristica.map((caracteristica) => (
                        <div key={caracteristica.id} className={styles['caracteristica-item']}>
                            <span className={styles.icono}>{caracteristica.icono}</span>
                            <span className={styles.nombre}>{caracteristica.nombre}</span>
                            <button className={styles['editar-boton']}>
                                <FaEdit /> EDITAR
                            </button>
                            <button className={styles['eliminar-boton']}>
                                <FaTrash /> ELIMINAR
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdministrarCaracteristicas;
