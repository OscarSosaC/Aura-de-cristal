import { useState, useEffect } from "react";
import productService from "../services/producto.service"; 
import styles from "../styles/AgregarProducto.module.css";
import { RiArrowGoBackFill } from "react-icons/ri"; // Importar el ícono
import Swal from "sweetalert2"; // Importar SweetAlert


const AgregarProducto = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio_alquiler: 0,
    categoria_id: 0,
    tematica_id: 0,
    imagenes: [],
    caracteristicaIds: [],
  });

  const [categorias, setCategorias] = useState([]);
  const [tematicas, setTematicas] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [nuevaImagen, setNuevaImagen] = useState("");
  


//Cargar las categorías, temáticas y características al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasData = await productService.obtenerCategorias();
        setCategorias(categoriasData.data);

        const tematicasData = await productService.obtenerTematicas();
        setTematicas(tematicasData.data);

        const caracteristicasData = await productService.obtenerCaracteristicas();
        setCaracteristicas(caracteristicasData.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData(); // Llamar a la función fetchData
  }, []); // Ejecutar solo al montar el componente



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio_alquiler" && parseInt(value, 10) < 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El precio de alquiler no puede ser negativo.",
      });
      return;
    }

    setProduct({
      ...product,
      [name]: name.includes("_id") || name === "precio_alquiler" ? parseInt(value, 10) : value,
    });
  };

  const agregarImagen = () => {
    if (nuevaImagen.trim()) {
      setProduct({
        ...product,
        imagenes: [...product.imagenes, nuevaImagen.trim()],
      });
      setNuevaImagen("");

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Imagen agregada correctamente.",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Ingrese una URL válida.",
      });
    }
  };

  const eliminarImagen = (index) => {
    setProduct({
      ...product,
      imagenes: product.imagenes.filter((_, i) => i !== index),
    });

    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Imagen eliminada correctamente.",
    });
  };

  const addFeature = () => {
    // Buscar la característica por su ID

    const feature = caracteristicas.find(
      (carac) => carac.idCaracteristica === parseInt(newFeature, 10)
    );

    // Verificar si la característica no está ya agregada    
    if (feature && !product.caracteristicaIds.some((f) => f.id === feature.idCaracteristica)) {
      setProduct({
        ...product,
        caracteristicaIds: [
          ...product.caracteristicaIds,
          feature.idCaracteristica,
        ],
      });

      setNewFeature("");
      
      //agregar un objeto de caracteristica a 

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Característica añadida correctamente.",
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "La característica ya está agregada o es inválida.",
      });
    }
  };

  const removeFeature = (id) => {
    setProduct({
      ...product,
      caracteristicaIds: product.caracteristicaIds.filter((featureId) => featureId.id !== id),
    });

    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Característica eliminada correctamente.",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.nombre || !product.descripcion || product.imagenes.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete todos los campos obligatorios.",
      });
      return;
    }

    try {
      await productService.agregarProducto(
        product.nombre,
        product.descripcion,
        product.precio_alquiler,
        product.categoria_id,
        product.tematica_id,
        product.imagenes,
        product.caracteristicaIds
      );

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Producto registrado con éxito.",
      });

      setProduct({
        nombre: "",
        descripcion: "",
        precio_alquiler: 0,
        categoria_id: 0,
        tematica_id: 0,
        imagenes: [],
        caracteristicaIds: [],
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar el producto.",
      });
    }
  };

  const onBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="btn-volv">
        <button className={styles.btnVolveradm} onClick={onBack}>
          <RiArrowGoBackFill />
          Volver
        </button>
      </div>
      <h3 className="title-form">Agregar Producto</h3>

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleChange}
            required
          />

          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={product.descripcion}
            onChange={handleChange}
            required
          ></textarea>

          <label>Precio de Alquiler:</label>
          <input
            type="number"
            name="precio_alquiler"
            value={product.precio_alquiler}
            onChange={handleChange}
            required
          />

          <label>Categoría:</label>
          <select
            name="categoria_id"
            value={product.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.descripcion}
              </option>
            ))}
          </select>

          <label>Temática:</label>
          <select
            name="tematica_id"
            value={product.tematica_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una temática</option>
            {tematicas.map((tem) => (
              <option key={tem.idTematica} value={tem.idTematica}>
                {tem.descripcion}
              </option>
            ))}
          </select>

          <label>Imágenes (URLs):</label>
          {product.imagenes.map((url, index) => (
            <div key={index} className={styles.imagenContainer}>
              <span>{url}</span>
              <button type="button" onClick={() => eliminarImagen(index)} className={styles.eliminarBtn}>
                Eliminar
              </button>
            </div>
          ))}
          <div>
            <input
              type="text"
              value={nuevaImagen}
              onChange={(e) => setNuevaImagen(e.target.value)}
              placeholder="Por favor, ingresa las 5 URLs correspondientes a las imágenes."
            />
            <button type="button" onClick={agregarImagen} className={styles.agregarBtn}>
              Agregar Imagen
            </button>
          </div>

          <label>Agregar Característica:</label>
          <select
            value={caracteristicas.idCaracteristica}
            onChange={(e) => setNewFeature(e.target.value)}
          >
            <option value="">Seleccione una característica</option>
            {caracteristicas.map((carac) => (
              <option key={carac.idCaracteristica} value={carac.idCaracteristica}>
                {carac.nombre} - {carac.descripcion}
              </option>
            ))}
          </select>
          <button type="button" onClick={addFeature} className={styles.agregarBtn}>
            Añadir Característica
          </button>

          <ul className={styles.listaCaracteristicas}>
  {product.caracteristicaIds.map((feature) => (
    <li key={feature} className={styles.itemCaracteristica}>
      {(() => {
        const carac = caracteristicas.find((c) => c.idCaracteristica === feature);
        return carac ? `${carac.nombre} - ${carac.descripcion}` : "Característica no encontrada";
      })()}

      <button
        type="button"
        className={styles.eliminarBtn}
        onClick={() => removeFeature(feature)}
      >
        Eliminar
      </button>
    </li>
  ))}
</ul>


          <button type="submit" className={styles.submitregistrar}>
            Registrar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;



