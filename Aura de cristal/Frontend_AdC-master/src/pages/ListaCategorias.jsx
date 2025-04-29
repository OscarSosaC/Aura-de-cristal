import StylesListaProductos from '../styles/ListaCategorias.module.css'
import CardProductos from '../components/CardProductos'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Button } from '@mui/material';
import { useProductosStates } from "../utils/Context"


function ListaCategorias() {
    console.log('RENDERIZANDO LISTA DE PRODUCTOS')
    const { state } = useProductosStates();
    const listaProductos = state.lista;
    console.log('listaProductos', listaProductos)

    const params = useParams();
    //filtramos los que sean de esa categoria
    const productosFiltrados = listaProductos.filter(producto => producto.categoria.idCategoria == params.id);
    // Copia del array original
    let datosProductos = [...productosFiltrados];
    let productosAleatorias = [];

    function mostrarElementoAleatorioSinRepetir(datosRestantes) {
        if (datosRestantes.length === 0) {
            console.log("Ya se mostraron todos los elementos.");
            return;
        }
        // Elegir un índice aleatorio
        const indiceAleatorio = Math.floor(Math.random() * datosRestantes.length);

        // Obtener y eliminar el elemento aleatorio
        const elementoAleatorio = datosRestantes.splice(indiceAleatorio, 1)[0];
        return elementoAleatorio;
    }

    for (let i = 0; i < productosFiltrados.length; i++) {
        let producto = mostrarElementoAleatorioSinRepetir(datosProductos);
        productosAleatorias.push(producto);
    }


    const obtenerTituloCategoria = () => {
        let titulo = 'Vajillas';
        if (params.id == 2) {
            titulo = 'Cubiertos';
        }
        else if (params.id == 3) {
            titulo = 'Cristalería';
        }
        return titulo;
    }

    const titulo = obtenerTituloCategoria();

    const navigate = useNavigate();

    const onBack = () => {
        navigate('/');
    }

    return (
        <>
            <div style={{
                padding: '2.3rem',
            }}>
            </div>
            <Button style={{
                backgroundColor: '#d1b362',
                float: 'right',
                border: 'none',
                color: 'white',
                padding: '5px 15px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
                marginRight: '25px',
            }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f2ca4e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#d1b362')}
                className='back' onClick={onBack}><RiArrowGoBackFill />
                Volver
            </Button>
            <section className={StylesListaProductos.productos}>
                <h3 className={StylesListaProductos.titulo}>{titulo}</h3>
                <div className={StylesListaProductos.cardGrid}>
                    {productosAleatorias.map((producto) => (
                        <CardProductos key={producto.idProducto} producto={producto} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default ListaCategorias