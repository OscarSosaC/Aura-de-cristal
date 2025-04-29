import React, { useState, useEffect } from 'react';
import { getUserByEmail } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ onLogout }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal-data');
    const [userData, setUserData] = useState({
        nombre: localStorage.getItem('userNombre'),
        apellido: localStorage.getItem('userApellido'),
        email: localStorage.getItem('userEmail'),
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    };

    const handleLogoutAndRedirect = () => {
        onLogout();
        localStorage.removeItem('authToken');
        navigate('/'); // Redirigir a la página de inicio
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile-layout">
                
                <div className="user-profile-content">
                    {activeTab === 'personal-data' && (
                        <div id="personal-data" className="user-profile-tab-content active">
                            <h2>Datos Personales</h2>
                            <div className="user-profile-form-group">
                                <br/>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={userData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu nombre"
                                    disabled
                                />
                            </div>
                            <div className="user-profile-form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    type="text"
                                    id="apellido"
                                    value={userData.apellido}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu apellido"
                                    disabled
                                />
                            </div>
                            <div className="user-profile-form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu correo electrónico"
                                    disabled
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/*<div className="user-profile-tabs user-profile-tabs-vertical">
                    <button
                        className={`tab-link ${activeTab === 'personal-data' ? 'active' : ''}`}
                        onClick={() => handleTabChange('personal-data')}
                    >
                        Datos Personales
                    </button>
                </div>*/

                
export default UserProfile;
