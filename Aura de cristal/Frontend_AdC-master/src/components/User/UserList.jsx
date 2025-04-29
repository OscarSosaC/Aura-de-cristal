import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import "./UserList.css";
import { getListUser, updateUser } from '../../services/user.service';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const UserList = () => {

    const [userList, setUserList] = useState(null);
    const [editableRow, setEditableRow] = useState(null);

    const handleEditClick = (rowIndex) => {
        setEditableRow(rowIndex);  // Set the row index to be editable
    };

    // Save edited row and stop editing
    const handleSaveClick = async (id, user) => {
        setEditableRow(null);  // Stop editing
        console.log(user);
        await updateUser(id,user);
    };

    // Save mui select
    const handleSelectChange = (e, field, id) => {
        const value = e.target.value;
        const updatedUserList = [...userList];
        let rowIndex = updatedUserList.findIndex(element => element.idUsuario === id);
        updatedUserList[rowIndex][field] = value;
        setUserList(updatedUserList);
    };

    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1)
    }

    const columns = [
        {
            name: 'id',
            selector: row => row.idUsuario,
            sortable: true,
            omit: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.rol,
            cell: (row, index) => (
                editableRow === index ? (
                    <FormControl>
                        <InputLabel id={`status-select-label-${row.idUsuario}`}></InputLabel>
                        <Select
                            labelId={`status-select-label-${row.idUsuario}`}
                            value={row.rol}
                            onChange={(e) => handleSelectChange(e, 'rol', row.idUsuario)}
                            sx={{
                                width: 150,       // Set width here
                                height: 50,       // Set height here
                                fontFamily: 'Arial, sans-serif',  // Change font family
                                fontSize: '16px',                // Change font size
                            }}
                        >
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="USER">USER</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    row.rol
                )
            ),
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row, index) => (
                editableRow === index ? (
                    <FormControl>
                        <button onClick={() => handleSaveClick(row.idUsuario, row)} className="btn-edit">Guardar</button>
                    </FormControl>
                ) : (
                    <FormControl>
                        <button onClick={() => handleEditClick(index)} className="btn-edit">Editar</button>
                    </FormControl>
                )
            ),
        }
    ];

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const list = await getListUser();
            // set state with the result
            console.log(list.data);
            setUserList(list.data);
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
                <h3 className="title-form">Usuarios registrados 📋</h3>
                </div>
                {
                    userList != null ? 
                        <React.Fragment>
                            <div style={{ height: '650px', overflowX: 'hidden', overflowY: 'auto', margin: '5% 5%'}}>
                                <DataTable
                                    columns={columns}
                                    data={userList}
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

    )
}

export default UserList;
