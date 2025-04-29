import React from 'react'
import StylesListaProductos from '../styles/ListaProductos.module.css'
import { Link } from "react-router-dom";

function CardProductos({ producto }) {
  console.log('RENDERIZANDO CARD PRODUCTOS')
  console.log('producto',producto)
  return (
    <div className={StylesListaProductos.card}>
      <Link to={{
        pathname: '/detail/' + producto.idProducto
      }}
        state={{ producto }}
        className={StylesListaProductos.link}>
        <img src={producto.imagenes[0].url} className={StylesListaProductos.cardImg} />
      </Link>
      <div className={StylesListaProductos.datos}>
        <h3 className={StylesListaProductos.nombreProducto} >{producto.nombre}</h3>
        <h3 className={StylesListaProductos.descripcionProducto} >{producto.descripcion}</h3>
        <h3 className={StylesListaProductos.precioProducto} >S/.{producto.precio_alquiler}</h3>
      </div>
    </div>
  )
}

export default CardProductos
