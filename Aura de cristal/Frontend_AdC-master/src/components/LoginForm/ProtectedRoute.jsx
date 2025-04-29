import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isAdmin, children }) => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    if (!isAuthenticated) {
        // Redirige al usuario a la página de login si no está autenticado
        return <Navigate to="/login" replace />;
    }
    if (isAdminPath) {
        if (!isAdmin) {
            return <Navigate to="/" replace />;
        }
    }

    // Si está autenticado, muestra el contenido protegido
    return children;
};

export default ProtectedRoute;
