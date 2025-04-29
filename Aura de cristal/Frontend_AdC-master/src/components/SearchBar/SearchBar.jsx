import './SearchBar.css';
import CalendarioBuscador from './CalendarioBuscador'
import React, { useState } from "react";
import {useProductosStates} from "../../utils/Context"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const SearchBar = () => {
    const {state,dispatch} = useProductosStates();
    const [mostrarCalendario, setmostrarCalendario] = useState(false);
    //const [busqueda, setbusqueda] = useState("");

    const handleCalendario = (event) => {
        event.preventDefault();
        setmostrarCalendario(!mostrarCalendario)
    };

    const noTieneNumeros =(texto) => {
        return !/\d/.test(texto); // Devuelve true si NO tiene números
      }
      

    const handleChangeBuscador= (event)=>{
        //setbusqueda(event.target.value);       
        dispatch({type:"INPUT_BUSQUEDA", payload:event.target.value});
      } 
    

    const buscar =(event) =>{
        event.preventDefault();
        console.log('busqueda',state.busqueda);
        if(noTieneNumeros(state.busqueda) && state.busqueda!=="" && state.fechaInicial ===null && state.fechaFinal ===null ){
            console.log('SOLO DESCRIPCION');
            dispatch({type:"MOSTRAR_BUSQUEDA", payload:true});
            console.log('antes',state.palabraDescripcion);
            dispatch({type:"VALOR_INPUT", payload:state.busqueda});
            console.log('despues',state.palabraDescripcion);
            dispatch({type:"TIPO_BUSQUEDA", payload:1});
        }else if(noTieneNumeros(state.busqueda) && state.busqueda==="" && state.fechaInicial !==null && state.fechaFinal !==null ){
            console.log('SOLO FECHAS');
            dispatch({type:"MOSTRAR_BUSQUEDA", payload:true});
            console.log('antes',state.palabraDescripcion);
            dispatch({type:"VALOR_INPUT", payload:state.busqueda});
            console.log('despues',state.palabraDescripcion);
            dispatch({type:"TIPO_BUSQUEDA", payload:2});
        }else if(noTieneNumeros(state.busqueda) && state.busqueda!=="" && state.fechaInicial !==null && state.fechaFinal !==null ){
            console.log('DESCRIPCION Y FECHAS');
            dispatch({type:"MOSTRAR_BUSQUEDA", payload:true});
            console.log('busq',state.mostrarBusqueda)
            console.log('antes',state.palabraDescripcion);
            dispatch({type:"VALOR_INPUT", payload:state.busqueda});
            console.log('despues',state.palabraDescripcion);
            dispatch({type:"TIPO_BUSQUEDA", payload:3});
        }

    }

    return (
        <>
            <form className='form'>
                <div className ='search-bar'>
                    <input 
                    type="text" style={{fontSize: '1rem', width :'80%',border:'none', borderRadius: '0px', backgroundColor:'transparent'}} 
                    placeholder="Que estás buscando?" className="search-input" 
                    value={state.busqueda} onChange={handleChangeBuscador}/>
                </div>
                <div className="buscadorParte2" >
                    
                    <button onClick={handleCalendario} className="open-modal-button">
                        <div className='divBotonFechas'>
                            Fecha
                            <p className='rangoFechas'>
                                {(state.fechaInicial ===null && state.fechaFinal ===null) ? 
                                ('Seleccionar'):
                                (`${state.fechaInicial} - ${state.fechaFinal}`)}
                            </p>
                        </div>
                        <KeyboardArrowDownIcon/>
                    </button>
                    <button className="botonBuscador" onClick={buscar}>Buscar</button>
                    {mostrarCalendario && (
                        <div className="modal-overlay">
                            <div className="modal-content">  
                                <CalendarioBuscador onClose={handleCalendario}/>
                            </div>
                        </div>
                    )}
                </div>
            </form>                    
            
        </>
    )
}

export default SearchBar
