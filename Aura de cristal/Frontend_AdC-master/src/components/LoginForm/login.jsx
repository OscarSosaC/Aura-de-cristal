// src/components/Login.jsx
import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { login } from '../../services/user.service';
import './login.css';

const userSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email incorrecto')
        .required('Se requiere un email'),
    password: Yup.string()
        .max(10, 'La contraseña no debe exceder los 10 caracteres')
        .required('Contraseña incorrecta'),
});

function Login({ onLoginSuccess }) {
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const response = await login(values.email, values.password);
            const { token , id, nombre , apellido, email, rol } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', id)            
            localStorage.setItem('userNombre', nombre);
            localStorage.setItem('userApellido', apellido);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRol', rol) 
            const initials = nombre.charAt(0) + apellido.charAt(0);
            localStorage.setItem('userInitials', initials)        

            Swal.fire({
                icon: 'success',
                title: '¡Login exitoso!',
                text: 'Bienvenido de nuevo',
                customClass: {
                  popup: 'elSwal'
                }
            });

            if (onLoginSuccess) {
                onLoginSuccess();
            }

            navigate('/');   
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: 'Las credenciales no son válidas',
                customClass: {
                    popup: 'elSwal'
                }
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    const handleCancelarRedirect = () => {
        navigate('/');
    }

    return (
        <Box className="login-container">
            <Typography
                className="login-text-login"
                sx={{
                    fontSize: '48px',
                    fontWeight: '250',
                    fontStyle: 'italic',
                    color: '#8E6B3266',
                    fontFamily: 'Kaushan Script',
                    marginBottom: '5rem',
                }}
            >
                Iniciar Sesión
            </Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={userSchema}
                onSubmit={handleLogin}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <Field
                            as={TextField}
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            helperText={
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    style={{
                                        color: '#a15750',
                                        fontSize: '0.9rem',
                                        marginTop: '0.25rem',
                                    }}
                                />
                            }
                        />
                        <Field
                            as={TextField}
                            label="Contraseña"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            helperText={
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    style={{
                                        color: '#a15750',
                                        fontSize: '0.9rem',
                                        marginTop: '0.25rem',
                                    }}
                                />
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className="login-button"
                            fullWidth
                            sx={{
                                backgroundColor: '#d8c7a0',
                                color: 'white',
                                outlineColor: '#635b4d',
                                borderColor: '#635b4d',
                                fontWeight: 'bold',
                                mt: 2,
                                '&:hover': {
                                    backgroundColor: '#c0b289',
                                },
                            }}
                            disabled={isSubmitting}
                        >
                            Ingresar
                        </Button>
                    </Form>
                )}
            </Formik>
            <Box className="login-links" sx={{ mt: 2 }}>
                <Button
                    className="register-button"
                    variant="contained"
                    sx={{
                        backgroundColor: '#a15750',
                        color: 'white',
                        outlineColor: '#635b4d',
                        borderColor: '#635b4d',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#8e4a3c',
                        },
                    }}
                    onClick={handleRegisterRedirect}
                >
                    Registrarse
                </Button>
            </Box>
            <Box className="cerrarsesion-links" sx={{ mt: 2 }}>
                <Button
                    className="cancelar-button"
                    variant="contained"
                    sx={{
                        backgroundColor: 'darkgray',
                        color: 'white',
                        outlineColor: '#635b4d',
                        borderColor: '#635b4d',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'gray',
                        },
                    }}
                    onClick={handleCancelarRedirect}
                >
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}

export default Login;

