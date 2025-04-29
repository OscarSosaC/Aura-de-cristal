export const reducer = (state,action) =>{
    switch(action.type){
        case "GET_PRODUCTOS":
            return {...state, lista:action.payload};
        case "GET_CATEGORIAS":
            return {...state, listaCategorias:action.payload};
        case "GET_PRODUCTOS_ALEATORIOS":
            return {...state, listaProductosAleatorios:action.payload};
        case "ADD_FECHA_INICIAL":
            return {...state, fechaInicial: action.payload};
        case "ADD_FECHA_FINAL":
            return {...state, fechaFinal: action.payload};
        case "ADD_FECHA_INICIAL_RESERVA":
            return {...state, fechaInicialReserva: action.payload};
        case "ADD_FECHA_FINAL_RESERVA":
            return {...state, fechaFinalReserva: action.payload};
        case "MOSTRAR_BUSQUEDA":
            return {...state, mostrarBusqueda: action.payload};
        case "REMOVE_FECHA_INICIAL":
            return {...state, fechaInicial: action.payload};
        case "REMOVE_FECHA_FINAL":
            return {...state, fechaFinal: action.payload};      
        case "VALOR_INPUT":
            return{...state, palabraDescripcion:action.payload}
        case "TIPO_BUSQUEDA":
            return {...state, tipo_Busqueda:action.payload};
        case "INPUT_BUSQUEDA":
            return {...state, busqueda:action.payload};
        case "PRODUCTOS_BUSQUEDA":
            return {...state, productosBusqueda:action.payload};
        case "REMOVE_FECHA_INICIAL_RESERVA":
            return {...state, fechaInicialReserva: action.payload};
        case "REMOVE_FECHA_FINAL_RESERVA":
            return {...state, fechaFinalReserva: action.payload};
        }       
}