import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducer/reducer";
import {BASE_URL} from '../services/user.service'

const productosStates= createContext();
const fechaInicial = JSON.parse(sessionStorage.getItem("fechaInicial")) || null;
const fechaFinal = JSON.parse(sessionStorage.getItem("fechaFinal")) || null;

const fechaInicialReserva = JSON.parse(sessionStorage.getItem("fechaInicialReserva")) || null;
const fechaFinalReserva = JSON.parse(sessionStorage.getItem("fechaFinalReserva")) || null;

const initialState = {
  lista:[],
  listaCategorias:[],
  listaProductosAleatorios:[],
  fechaInicial:fechaInicial,
  fechaFinal:fechaFinal,
  fechaInicialReserva:fechaInicialReserva,
  fechaFinalReserva:fechaFinalReserva,
  mostrarBusqueda:false,
  palabraDescripcion:"",
  tipo_Busqueda:3, 
  busqueda:"",
  productosBusqueda:[]
}

function convertirFecha(fecha) {
  if (fecha !== null){
    const [dia, mes, anio] = fecha.split("/"); // Divide la cadena
    return `${anio}-${mes}-${dia}`; // Reorganiza en el formato deseado
  }else{
    return "";
  }
}


const Context = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initialState)
  const urlListarProductos=`${BASE_URL}/productos/listar`;
  const urlListarProductosAleatorios=`${BASE_URL}/productos/aleatorios`;
  const urlListarCategorias=`${BASE_URL}/categorias/listar`;
  const urlBuscarProductosDescripcion  =`${BASE_URL}/productos/disponibles?descripcion=${state.palabraDescripcion}`;
  const urlBuscarProductosFechas  =`${BASE_URL}/productos/disponibles?descripcionfechaInicio=${ convertirFecha(state.fechaInicial)}&fechaFin=${ convertirFecha(state.fechaFinal)}`;
  const urlBuscarProductosDescripcionFechas  =`${BASE_URL}/productos/disponibles?descripcionfechaInicio=${ convertirFecha(state.fechaInicial)}&fechaFin=${ convertirFecha(state.fechaFinal)}&descripcion=${state.palabraDescripcion}`;

console.log('des',urlBuscarProductosDescripcion);
console.log('fec',urlBuscarProductosFechas);
console.log('fecDes',urlBuscarProductosDescripcionFechas);

  //listar productos
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        //se obtiene la lista de productos aleatorios
        const resProductosAleatorios = await axios(urlListarProductosAleatorios);
        console.log(resProductosAleatorios.data);
        dispatch({ type: "GET_PRODUCTOS_ALEATORIOS", payload: resProductosAleatorios.data });
  
        // Luego de obtener los productos, obtenemos las categorías
        const resCategorias = await axios(urlListarCategorias);
        console.log(resCategorias.data);
        dispatch({ type: "GET_CATEGORIAS", payload: resCategorias.data });

        //se obtiene la lista de productos 
        const resProductos = await axios(urlListarProductos);
        console.log(resProductos.data);
        dispatch({ type: "GET_PRODUCTOS", payload: resProductos.data });
  
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
  
    obtenerProductos();
  }, [dispatch]);

  //fechas
  useEffect(() => {
    sessionStorage.setItem("fechaInicial", JSON.stringify(state.fechaInicial));
    sessionStorage.setItem("fechaFinal", JSON.stringify(state.fechaFinal));
  }, [state.fechaInicial, state.fechaFinal]);
  
  //fechasReserva
  useEffect(() => {
    sessionStorage.setItem("fechaInicialReserva", JSON.stringify(state.fechaInicialReserva));
    sessionStorage.setItem("fechaFinalReserva", JSON.stringify(state.fechaFinalReserva));
  }, [state.fechaInicialReserva, state.fechaFinalReserva]);

  //buscador
  if(state.tipo_Busqueda === 1){
    //buscar solo descripcion
    useEffect(() => {
      const obtenerProductosDescripcion = async () => {
      console.log('entro1');
      try {
        //se obtiene los productos cuando solo se ingresa la descripcion
        const resProductosDescripcion = await axios(urlBuscarProductosDescripcion);
        console.log('pro_des',resProductosDescripcion.data);
        dispatch({ type: "PRODUCTOS_BUSQUEDA", payload: resProductosDescripcion.data });
      } catch (error) {
        console.error("Error al obtener los datos de la busqueda solo descripcion:", error);
      }
    }
    obtenerProductosDescripcion();
    }, [state.palabraDescripcion]);
  }else if (state.tipo_Busqueda === 2){
    //buscar solo fechas
    useEffect(() => {
      const obtenerProductosFechas = async () => {
      console.log('entro2');
      try {
        //se obtiene los productos cuando solo se ingresan las fechas
        const resProductosFechas = await axios(urlBuscarProductosFechas);
        console.log('pro_fec',resProductosFechas.data);
        dispatch({ type: "PRODUCTOS_BUSQUEDA", payload: resProductosFechas.data });
      } catch (error) {
        console.error("Error al obtener los datos de la busqueda solo fechas:", error);
      }
    }
    obtenerProductosFechas();
    }, [state.fechaFinal, state.tipo_Busqueda]);
  }else if (state.tipo_Busqueda === 3){
   
    //buscar ambos
    useEffect(() => {
      
      const obtenerProductosDescripcionFechas = async () => {
      console.log('entro3');
      try {
        //se obtiene los productos cuando ingresa amos
        const resProductosDescripcionFecha = await axios(urlBuscarProductosDescripcionFechas);
        console.log('pro_desfec',resProductosDescripcionFecha.data);
        dispatch({ type: "PRODUCTOS_BUSQUEDA", payload: resProductosDescripcionFecha.data });
      } catch (error) {
        console.error("Error al obtener los datos de la busqueda de descripcion y fecha:", error);
      }
    }
    obtenerProductosDescripcionFechas();
    }, [state.palabraDescripcion, state.fechaFinal]); 
   
  }
  console.log('bus',state.tipo_Busqueda);


  return (
    <productosStates.Provider value={{ state, dispatch }}> 
      {children}
    </productosStates.Provider>
  );
};

export default Context;

export const useProductosStates = () => useContext(productosStates);
