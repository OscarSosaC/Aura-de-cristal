import React, { useEffect, useState } from "react";
import StylesHome from '../styles/Home.module.css'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar/SearchBar';
import { useProductosStates } from "../utils/Context"
import CloseIcon from '@mui/icons-material/Close';
import { getListProductRandom } from '../services/producto.service';
import { getListCategory } from '../services/categoria.service';

const Home = () => {
    console.log('RENDERIZANDO HOME')
    const { state, dispatch } = useProductosStates();
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [recomendationList, setRecomendationList] = useState(null);
    //const listaProductos = state.listaProductosAleatorios;
    //const listaCategorias = state.listaCategorias;


    const onClose = (event) => {
        event.preventDefault();
        dispatch({ type: "MOSTRAR_BUSQUEDA", payload: false });
    }

    console.log('state.mostrarBusqueda', state.mostrarBusqueda)

    useEffect(() => {
        // declare the async data fetching function
        const fetchDataProduct = async () => {
            // get the data from the api
            const list = await getListProductRandom();
            // set state with the result
            console.log(list.data);
            setProductList(list.data);
            setRecomendationList(list.data.slice(0, 3));
        }
        // call the function
        fetchDataProduct()
            // make sure to catch any error
            .catch(console.error);
        // declare the async data fetching function
        const fetchDataCategory = async () => {
            // get the data from the api
            const list = await getListCategory();
            // set state with the result
            console.log(list.data);
            setCategoryList(list.data);
        }
        // call the function
        fetchDataCategory()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    return (
        <>
            {
                productList != null && categoryList != null ?
                    <React.Fragment>
                        <SearchBar />
                        {
                            (state.mostrarBusqueda && state.productosBusqueda) &&
                            (<section className={StylesHome.busqueda}>
                                <button onClick={onClose} className={StylesHome.botonIconoCerrar}>
                                    <CloseIcon className={StylesHome.iconoCerrar} />
                                </button>
                                {
                                    state.productosBusqueda.length === 0 ?
                                        (<p className={StylesHome.tituloNoResultados}>Lo sentimos, no hay productos que coincidan con tu búsqueda.</p>) :
                                        (
                                            <>
                                                <h3 className={StylesHome.tituloBusqueda}>Resultados de la busqueda</h3>
                                                <div className={StylesHome.cardGrid}>
                                                    {state.productosBusqueda.map((producto) => (
                                                        <Card key={producto.idProducto} dato={producto} esCategoria={false} productos={productList} esBusqueda={true} />
                                                    ))}
                                                </div>
                                            </>)
                                }
                            </section>
                            )
                        }
                        <section className={StylesHome.categorias}>
                            <h3 className={StylesHome.titulo}>Categorías</h3>
                            <div className={StylesHome.cardGrid}>
                                {categoryList.map((categoria) => (
                                    <Card key={categoria.idCategoria} dato={categoria} esCategoria={true} productos={productList} esBusqueda={false} />
                                ))}
                            </div>
                        </section>
                        <section className={StylesHome.categorias}>
                            <h3 className={StylesHome.titulo}>Recomendaciones</h3>
                            <div className={StylesHome.cardGrid}>
                                {recomendationList.map((recomendacion) => (
                                    <Card key={recomendacion.idProducto} dato={recomendacion} esCategoria={false} productos={productList[recomendacion.id]} esBusqueda={false} />
                                ))}
                            </div>
                        </section>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
            }

        </>
    )
}

export default Home