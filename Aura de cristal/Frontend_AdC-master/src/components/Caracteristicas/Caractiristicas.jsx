import { getCaracteristica } from "../../services/caracteristicas.service";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';  // Importa PropTypes
import "./Caracteristicas.css";

const iconos = {
  Material: "🧱",
  Dimensiones: "📏",
  Peso: "⚖️",
  Lavavajillas: "🧼",
  Microondas: "🔥",
  Garantía: "📜" // Ícono por defecto si no hay coincidencia
};

const Caracteristicas = ({ idProducto }) => {
  const [caracteristicas, setCaracteristicas] = useState([]);

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await getCaracteristica(idProducto);
        // Verificar si la respuesta contiene los datos esperados
        if (Array.isArray(response.data)) {
          setCaracteristicas(response.data);
        } else {
          console.error("La respuesta no contiene un array:", response.data);
          setCaracteristicas([]);
        }
      } catch (error) {
        console.error("Error al obtener características:", error);
        setCaracteristicas([]);
      }
    };

    fetchCaracteristicas();
  }, [idProducto]);

  return (
    <div className="caracteristicas-grid">
      {caracteristicas.length > 0 ? (
        caracteristicas.map((item, index) => (
          <div className="caracteristica-item" key={index}>
            <div className="caracteristica-contenedor">
              <span className="icon">{iconos[item.nombre] || iconos.default}</span>
              <div className="caracteristica-texto">
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay características disponibles.</p>
      )}
    </div>
  );
};

// Añadir validación de propTypes
Caracteristicas.propTypes = {
  idProducto: PropTypes.string.isRequired, // Suponiendo que idProducto es una cadena de texto
};

export default Caracteristicas;


