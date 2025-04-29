package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.ProductoEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.*;
import com.auradecristal.aura_de_cristal.repository.ICaracteristicaRepository;
import com.auradecristal.aura_de_cristal.repository.ICategoriaRepository;
import com.auradecristal.aura_de_cristal.repository.IProductoRepository;
import com.auradecristal.aura_de_cristal.repository.ITematicaRepository;
import com.auradecristal.aura_de_cristal.service.IProdutoService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService implements IProdutoService {

    @Autowired
    private IProductoRepository productoRepository;
    @Autowired
    private ICategoriaRepository categoriaRepository;
    @Autowired
    private ITematicaRepository tematicaRepository;
    @Autowired
    private ICaracteristicaRepository caracteristicaRepository;
    @Autowired
    private ImagenService imagenService;
    @Autowired
    private ModelMapper modelMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(ProductoService.class);

    public ProductoService(IProductoRepository IProductoRepository, ICategoriaRepository ICategoriaRepository, ITematicaRepository ITematicaRepository, ICaracteristicaRepository caracteristicaRepository, ModelMapper modelMapper) {
        this.tematicaRepository = ITematicaRepository;
        this.categoriaRepository = ICategoriaRepository;
        this.productoRepository = IProductoRepository;
        this.caracteristicaRepository = caracteristicaRepository;
        this.modelMapper = modelMapper;
        configureMapping();
    }

    @Override
    public List<ProductoSalidaDTO> listarProductos() {
        List<ProductoSalidaDTO> productos = productoRepository.findAll()
                .stream()
                .map(producto -> modelMapper.map(producto, ProductoSalidaDTO.class))
                .toList();
        LOGGER.info("Listado de todos los productos: {}", JsonPrinter.toString(productos));
        return productos;
    }

    public List<ProductoSalidaDTO> obtenerProductosAleatorios() {
        List<Producto> productosAleatorios = productoRepository.findRandomProducts();
        return productosAleatorios.stream()
                .map(producto -> modelMapper.map(producto, ProductoSalidaDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductoSalidaDTO registrarProducto(ProductoEntradaDTO productoEntradaDTO) {

        Producto producto = modelMapper.map(productoEntradaDTO, Producto.class);

        if (productoRepository.findByNombre(producto.getNombre()).isPresent()) {
            throw new IllegalArgumentException("El producto con el nombre '" + producto.getNombre() + "' ya existe.");
        }

        Categoria categoria = categoriaRepository.findById(productoEntradaDTO.getCategoria_id())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));

        Tematica tematica = tematicaRepository.findById(productoEntradaDTO.getTematica_id())
                .orElseThrow(() -> new EntityNotFoundException("Temática no encontrada"));

        producto.setCategoria(categoria);
        producto.setTematica(tematica);

        for (String url : productoEntradaDTO.getImagenes()) {
            Imagen imagen = new Imagen();  // Crear una nueva instancia de Imagen
            imagen.setUrl(url);  // Asignar la URL a la imagen
            producto.getImagenes().add(imagen);
        }

        for (Long id : productoEntradaDTO.getCaracteristicaIds()) {
            Caracteristica caracteristica = caracteristicaRepository.findById(id)
                   .orElseThrow(() -> new EntityNotFoundException("Característica con id " + id + " no encontrada"));
            producto.getCaracteristicas().add(caracteristica);
        }

        Producto productoGuardado = productoRepository.save(producto);

        ProductoSalidaDTO productoSalidaDTO = modelMapper.map(productoGuardado, ProductoSalidaDTO.class);

        LOGGER.info("ProductoSalidaDto: " + JsonPrinter.toString(productoSalidaDTO));
        return productoSalidaDTO;
    }

    @Override
    public ProductoSalidaDTO buscarProductoXId(Long id) {
        Producto productoBuscado = productoRepository.findById(id).orElse(null);
        ProductoSalidaDTO productoEncontrado = null;

        if (productoBuscado != null){
            productoEncontrado = modelMapper.map(productoBuscado, ProductoSalidaDTO.class);
            LOGGER.info("Producto encontrado: {}", JsonPrinter.toString(productoEncontrado));
        } else {
            LOGGER.info("Producto no encontrado: {}");
        }

        return productoEncontrado;
    }

    public List<ImagenSalidaDTO> obtenerImagenesXProducto(Long idProducto){

        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new EntityNotFoundException("Producto con id " + idProducto + " no encontrado"));

        ProductoSalidaDTO productoSalidaDTO = modelMapper.map(producto, ProductoSalidaDTO.class);
        return productoSalidaDTO.getImagenes();
    }

    @Override
    public List<CaracteristicaSalidaDTO> obtenerCaracteristicasXProducto(Long idProducto){

        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new EntityNotFoundException("Producto con id " + idProducto + " no encontrado"));

        ProductoSalidaDTO productoSalidaDTO = modelMapper.map(producto, ProductoSalidaDTO.class);
        return productoSalidaDTO.getCaracteristicas();
    }

    @Override
    public void eliminarProducto(Long id) {
        if (buscarProductoXId(id) != null) {
            productoRepository.deleteById(id);
            LOGGER.info("Producto eliminado el producto con id: {}", id);
        } else {
            LOGGER.info("Producto no encontrado para eliminar: {}", id);
        }
    }

    @Override
    public ProductoSalidaDTO actualizarProducto(ProductoEntradaDTO productoEntradaDTO, Long id) {

        Producto productoAActualizar = productoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El producto con id '" + id + "' no existe."));

        productoAActualizar.setNombre(productoEntradaDTO.getNombre());
        productoAActualizar.setDescripcion(productoEntradaDTO.getDescripcion());
        productoAActualizar.setPrecio_alquiler(productoEntradaDTO.getPrecio_alquiler());

        productoRepository.save(productoAActualizar);

        ProductoSalidaDTO productoSalidaDTO = modelMapper.map(productoAActualizar, ProductoSalidaDTO.class);
        LOGGER.warn("Producto actualizado: {}", JsonPrinter.toString(productoSalidaDTO));

        return productoSalidaDTO;
    }

    @Override
    public List<ProductoSalidaDTO> obtenerProductosPorFechaODescripcion(LocalDate fechaInicio, LocalDate fechaFin, String descripcion) {
        if (fechaInicio == null || fechaFin == null) {
            // Si no se proporcionan fechas, solo buscar por descripcion
            return productoRepository.findProductosDisponiblesSinFechas(descripcion)
                    .stream()
                    .map(producto -> modelMapper.map(producto, ProductoSalidaDTO.class))
                    .toList();
        }
        // Si se proporcionan fechas, buscar con los rangos de fechas y descripcion
        return productoRepository.findProductosDisponiblesConFechas(fechaInicio, fechaFin, descripcion)
                .stream()
                .map(producto -> modelMapper.map(producto, ProductoSalidaDTO.class))
                .toList();
    }

    @Transactional
    public ProductoSalidaDTO agregarCaracteristicas(Long productoId, List<Long> caracteristicaIds) throws Exception {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new Exception("Producto no encontrado con id: " + productoId));
        List<Caracteristica> caracteristicas = caracteristicaRepository.findAllById(caracteristicaIds);

        producto.getCaracteristicas().addAll(new HashSet<>(caracteristicas));
        producto = productoRepository.save(producto);

        ProductoSalidaDTO productoSalidaDTO = modelMapper.map(producto, ProductoSalidaDTO.class);
        List<CaracteristicaSalidaDTO> caracteristicasSalidaDTO = producto.getCaracteristicas().stream()
                .map(caracteristica -> modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class))
                .collect(Collectors.toList());
        productoSalidaDTO.setCaracteristicas(caracteristicasSalidaDTO);

        return productoSalidaDTO;
    }


    /**
     * Configuracion del mapper para asignar el valor del atributo Categoria, Tematica y Caracteristica
     * para personalizar cómo los objetos se convierten entre sí, específicamente entre ProductoEntradaDto y
     * Producto, y entre Producto y ProductoSalidaDto.
     */
    private void configureMapping() {
        modelMapper.typeMap(ProductoEntradaDTO.class, Producto.class)
                .addMappings(mapper -> {
                    mapper.map(ProductoEntradaDTO::getNombre, Producto::setNombre);
                    mapper.map(ProductoEntradaDTO::getDescripcion, Producto::setDescripcion);
                    mapper.map(ProductoEntradaDTO::getPrecio_alquiler, Producto::setPrecio_alquiler);
                    mapper.skip(Producto::setCaracteristicas);
                    mapper.skip(Producto::setImagenes);

                });

        modelMapper.typeMap(Producto.class, ProductoSalidaDTO.class)
                .addMappings(mapper -> mapper.map(Producto::getCategoria, ProductoSalidaDTO::setCategoria))
                .addMappings(mapper -> mapper.map(Producto::getTematica, ProductoSalidaDTO::setTematica))
                .addMappings(mapper -> mapper.map(Producto::getImagenes, ProductoSalidaDTO::setImagenes))
                .addMappings(mapper -> mapper.map(Producto::getCaracteristicas, ProductoSalidaDTO::setCaracteristicas));
    }

}
