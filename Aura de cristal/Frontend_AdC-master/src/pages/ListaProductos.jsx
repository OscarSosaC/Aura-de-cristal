import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import StylesAdmin from '../styles/ListaProductos.module.css';
import { getListProduct } from '../services/producto.service';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ListaProductos = () => {
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();
    const [productList, setProductList] = useState(null);

    const onBack = () => {
        navigate(-1)
    }

    const columns = [
        {
            name: 'id',
            selector: row => row.idProducto,
            sortable: true,
            omit: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        }
    ];

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const list = await getListProduct();
            // set state with the result
            console.log(list.data);
            setProductList(list.data);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    return (
        <React.Fragment>
            <div className="container-adm">
                <div className="btn-volv">
                    <Button style={{
                        float: 'left',
                        border: 'none',
                        color: 'white',
                        padding: '5px 15px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#9a6d4c',
                        borderRadius: '5px',
                    }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#f2ca4f')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#d1b362')}
                        className='' onClick={onBack}><RiArrowGoBackFill />
                        Volver
                    </Button>
                </div>
                <h3 className="title-form">Productos registrados 📋</h3>
            </div>
            {
                productList != null ?
                    <React.Fragment>
                        <div style={{ height: '650px', overflowX: 'hidden', overflowY: 'auto', margin: '3% 3%' }}>
                            <DataTable
                                columns={columns}
                                data={productList}
                                pagination          // Enable pagination
                                paginationPerPage={5} // Show 5 rows per page
                                paginationRowsPerPageOptions={[5, 10, 15]} // Options for number of rows per page
                                highlightOnHover     // Optional: Highlight rows on hover
                                striped              // Optional: Striped rows for better readability
                            />
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment></React.Fragment>
            }


        </React.Fragment >
    );
}

export default ListaProductos;
