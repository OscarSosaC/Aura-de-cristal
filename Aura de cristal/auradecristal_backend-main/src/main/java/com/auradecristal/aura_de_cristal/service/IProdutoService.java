package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.ProductoEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;

import java.time.LocalDate;
import java.util.List;

public interface IProdutoService {

    List<ProductoSalidaDTO> listarProductos();
    List<ProductoSalidaDTO> obtenerProductosAleatorios();
    ProductoSalidaDTO registrarProducto(ProductoEntradaDTO productoEntradaDTO);
    ProductoSalidaDTO buscarProductoXId(Long id);
    List<ImagenSalidaDTO> obtenerImagenesXProducto(Long idProducto);
    List<CaracteristicaSalidaDTO> obtenerCaracteristicasXProducto(Long idProducto);
    void eliminarProducto(Long id);
    ProductoSalidaDTO actualizarProducto(ProductoEntradaDTO productoEntradaDTO, Long id);
    List<ProductoSalidaDTO> obtenerProductosPorFechaODescripcion(LocalDate fechaInicio, LocalDate fechaFin, String descripcion);
}
