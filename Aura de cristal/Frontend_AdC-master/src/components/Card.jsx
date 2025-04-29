import React from "react";
import StylesHome from '../styles/Home.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({ dato, esCategoria, productos, esBusqueda }) => {

  console.log('RENDERIZANDO CARD')
  const [producto, setProducto] = useState(dato);

  useEffect(() => {
    // Si el objeto en las props cambia, actualizamos el estado
    setProducto(producto);
  }, [producto]);


  let productoCategoria = {};
  if (esCategoria) {
    for (const producto of productos) {

      if (producto.categoria.idCategoria == dato.idCategoria) {
        productoCategoria = producto;
        break; // Detenemos el recorrido 
      } else {
        productoCategoria = null;
      }
    }

  }

  console.log('productoCategoria', productoCategoria);


  return (
    <div className={StylesHome.card}>
      {esCategoria && productoCategoria ? (
        <>
          <Link to={'/listaCategorias/' + dato.idCategoria} className={StylesHome.link}>
            <h3 className={StylesHome.nombreCategorias} >{dato.descripcion}</h3>
            <img src={productoCategoria.imagenes[0].url} className={StylesHome.cardImg} />
          </Link>
        </>
      ) : (

        esBusqueda ?
          (
            <>
              <Link to={{
                pathname: '/detail/' + dato.idProducto
              }}
                state={{ 
                  producto,
                  esRecomendacion:false
                  }} className={StylesHome.link}>
                <h3 className={StylesHome.nombreCategorias} >{dato.nombre}</h3>
                <img src={dato.imagenes[0].url} className={StylesHome.cardImg} />
              </Link>
              <div className={StylesHome.precioBusqueda}>
                <span className={StylesHome.piezas}>Precio: S/.{dato.precio_alquiler}</span>
              </div>
            </>
          ) :
          (
            <>
              <Link to={{
                pathname: '/detail/' + dato.idProducto
              }}
                state={{  producto,
                  esRecomendacion: true  // Asignamos directamente `true` al estado
                }} className={StylesHome.link}>
                <h3 className={StylesHome.nombreCategorias} >{dato.nombre}</h3>
                <img src={dato.imagenes[0].url} className={StylesHome.cardImg} />
              </Link>
              <div className={StylesHome.recomendacionesPiezas}>
                <span className={StylesHome.piezas}>S/.{dato.precio_alquiler}</span>
                <span className={StylesHome.calificacion}>4.8⭐</span>
              </div>
            </>
          )

      )}

    </div>


  );
};

export default Card;
