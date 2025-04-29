// App.jsx
import './App.css'
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Administrador from "./pages/Administrador";
import Detail from './pages/Detail';
import Gallery from './pages/Gallery';
import { useState, useEffect } from "react";
import AgregarProducto from './pages/AgregarProducto';
import RegisterForm from './components/RegisterForm/RegisterForm';
import ListaProductos from './pages/ListaProductos';
import ListaCategorias from './pages/ListaCategorias';
import Login from './components/LoginForm/login';
import UserProfile from './components/UserProfile/UserProfile';
import ProtectedRoute from './components/LoginForm/ProtectedRoute';
import Logout from './components/Logout/Logout';
import UserList from './components/User/UserList';
import { useProductosStates } from "./utils/Context"
import { logout } from './services/user.service';
import Reserva from './pages/Reserva'
import ReservaExitosa from './pages/ReservaExitosa'

function App() {
    console.log('RENDERIZANDO APP');
    const { dispatch } = useProductosStates();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userRol') === "ADMIN" ? true : false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setIsAdmin(localStorage.getItem('userRol') === "ADMIN" ? true : false);
        dispatch({ type: "REMOVE_FECHA_INICIAL", payload: null });
        dispatch({ type: "REMOVE_FECHA_FINAL", payload: null });
        dispatch({ type: "MOSTRAR_BUSQUEDA", payload: false });
        dispatch({ type: "INPUT_BUSQUEDA", payload: "" });
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        logout();
        setIsAuthenticated(false);
        dispatch({ type: "REMOVE_FECHA_INICIAL", payload: null });
        dispatch({ type: "REMOVE_FECHA_FINAL", payload: null });
        dispatch({ type: "MOSTRAR_BUSQUEDA", payload: false });
        dispatch({ type: "INPUT_BUSQUEDA", payload: "" });
    };

    const [listaProductos, setListaProductos] = useState([]);

    console.log('lista productos app', listaProductos);

    return (
        <>
            <div>
                <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<h2>Error 404</h2>} />
                    <Route path="/listaCategorias/:id" element={<ListaCategorias />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/gallery/:id" element={<Gallery />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/reserva/:id" element={<Reserva />} />
                    <Route path="/reservaExitosa" element={<ReservaExitosa />} />
                    <Route
                        path="/logout"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <Logout onLogout={handleLogout} />
                            </ProtectedRoute>
                        }
                    />

                    {/*ADMIN - INICIO*/}
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <Administrador />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/listaProductos'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <ListaProductos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/agregarProducto'
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <AgregarProducto listaProductos={listaProductos} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/user-list"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />
                    {/*ADMIN - FIN*/}

                    {/*Cosas usuario comun logueado */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
