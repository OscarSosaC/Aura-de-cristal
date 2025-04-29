import React, { useState } from "react";
// import { getOneUser } from "../../services/user.service";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import "./register.css";
import { createUser, reSendEmail } from '../../services/user.service';

const RegisterComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errorsResponse, setErrorsResponse] = useState();

    const userSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Hey, es muy corto el nombre!')
            .max(20, 'Hey, es muy largo el nombre!')
            .required('Se requiere agregar un nombre'),
        lastName: Yup.string()
            .min(3, 'Hey, es muy corto el apellido!')
            .max(20, 'Hey, es muy largo el apellido!')
            .required("Se requiere agregar un apellido"),
        email: Yup.string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "Formato de correo electrónico no válido")
            .required("Se requiere un email"),
        password: Yup.string()
            .min(6, '¡Demasiado corto! La contraseña debe tener una longitud mínima de 6 caracteres.')
            .max(10, 'La contraseña no debe exceder los 10 caracteres')
            .matches(/(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/, 'La contraseña debe incluir al menos un carácter especial')
            .matches(/(?=.*[a-z])(?=.*[A-Z])/, 'La contraseña debe incluir al menos una letra mayúscula')
            .matches(/(?=.*[0-9])/, 'La contraseña debe contener al menos un número')
            .required("La contraseña es incorrecta"),
    });

    const sendNewUser = async (user) => {
        try {
            const response = await createUser(user.name, user.lastName, user.email, user.password);
            Swal.fire({
                icon: 'success',
                title: 'Aura de Cristal',
                text: 'Usuario creado',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    showSwalSendEmail(user.email);
                }                
            });
        } catch (error) {
            let message = error.response.data;
            Swal.fire({
                icon: 'error',
                title: 'Aura de Cristal',
                text: `${message}`,
            });
        }
    };

    const showSwalSendEmail = async (email) => {
        Swal.fire({
            icon: 'success',
            title: 'Aura de Cristal',
            text: 'Se envio un correo de confirmacion a su email',
            showCancelButton: true,
            cancelButtonText: "Si no le llego el correo, pulse aqui para reenviar",
            confirmButtonColor: '#000',
            cancelButtonColor: '#8D3434CC'    
        }).then(async (result) => {
            if (result.isConfirmed) {
                navigate('/');
            } else {                
                await reSendEmail(email);
                showSwalSendEmail(email);                
            }                
        });
    };    

    return (
        <React.Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={user}
                validationSchema={userSchema}
                onSubmit={sendNewUser}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='registro'>
                            {id ? (
                                <h3>Actualizar {user.name}</h3>
                            ) : (
                                <h3 className="title-form">Crear cuenta 📋</h3>
                            )}
                            <p className="text-2">Vamos a comenzar a configurar su perfil.</p>
                            <div className='row'>
                                <div className='column'>
                                    <h3 className="text">Datos de registro de usuario</h3>
                                    <div>
                                        <Field name="name" placeholder="Nombre" className="holder-style" />
                                        {errors.name && touched.name ? (
                                            <div>{errors.name}</div>
                                        ) : null}
                                        {errorsResponse?.name && (
                                            <div>{errorsResponse.name.message}</div>
                                        )}
                                    </div>
                                    <br />
                                    <div>
                                        <Field name="lastName" placeholder="Apellido" className="holder-style" />
                                        {errors.lastName && touched.lastName ? (
                                            <div>{errors.lastName}</div>
                                        ) : null}
                                        {errorsResponse?.lastName && (
                                            <div>{errorsResponse.lastName.message}</div>
                                        )}
                                    </div>
                                    <br />
                                    <div>
                                        <Field name="email" placeholder="Email" className="holder-style" />
                                        {errors.email && touched.email ? (
                                            <div>{errors.email}</div>
                                        ) : null}
                                        {errorsResponse?.email && (
                                            <div>{errorsResponse.email.message}</div>
                                        )}
                                    </div>
                                    <br />
                                    <div>
                                        <Field type="password" name="password" placeholder="Contraseña" className="holder-style" />
                                        {errors.password && touched.password ? (
                                            <div>{errors.password}</div>
                                        ) : null}
                                        {errorsResponse?.password && (
                                            <div>{errorsResponse.password.message}</div>
                                        )}
                                    </div>
                                    <br />
                                </div>
                            </div>
                            <br />
                            {id ? (
                                <Button variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#9575cd', display: 'inline', fontSize: 14 }} className='btn-c' type="submit">Actualizar</Button>

                            ) : (
                                <Button variant="outlined" sx={{ borderRadius: '20px', borderColor: '#645b4d', backgroundColor: '#E3DACC', color: '#645b4d', display: 'inline', fontSize: 14 }} className='btn-c' type="submit">Registrarse</Button>
                            )}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {id ? (
                                <Button variant="outlined" sx={{ borderRadius: '20px', color: '#fff', backgroundColor: '#a45c5c', display: 'inline', fontSize: 14 }} className='btn-c' onClick={() => navigate("/user/list")}>Cancelar</Button>

                            ) : (
                                <Button variant="outlined" sx={{ borderRadius: '20px', color: '#fff', backgroundColor: '#a45c5c', display: 'inline', fontSize: 14 }} className='btn-c' onClick={() => navigate("/")}>Cancelar</Button>
                            )}
                        </div>
                    </Form>
                )
                }
            </Formik >
        </React.Fragment >

    )
}

export default RegisterComponent;
