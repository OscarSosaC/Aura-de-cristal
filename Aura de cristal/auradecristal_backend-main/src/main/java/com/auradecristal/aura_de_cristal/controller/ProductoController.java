package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.ProductoEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;
import com.auradecristal.aura_de_cristal.service.impl.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("productos")
@CrossOrigin
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ProductoSalidaDTO>> listarProductos () {
        return new ResponseEntity<>(productoService.listarProductos(), HttpStatus.OK);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<ProductoSalidaDTO>> listarProductos(
            @RequestParam(required = false) LocalDate fechaInicio,
            @RequestParam(required = false) LocalDate fechaFin,
            @RequestParam(required = false) String descripcion) {
        return new ResponseEntity<>(productoService.obtenerProductosPorFechaODescripcion(fechaInicio, fechaFin, descripcion), HttpStatus.OK);
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductoSalidaDTO>> obtenerProductosAleatorios() {
        List<ProductoSalidaDTO> productos = productoService.obtenerProductosAleatorios();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/imagenes/{idProducto}")
    public List<ImagenSalidaDTO> obtenerImagenesPorProducto(@PathVariable Long idProducto) {
        return productoService.obtenerImagenesXProducto(idProducto);
    }

    @GetMapping("/caracteristicas/{idProducto}")
    public List<CaracteristicaSalidaDTO> obtenerCaracteristicasPorProducto(@PathVariable Long idProducto) {
        return productoService.obtenerCaracteristicasXProducto(idProducto);
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarProducto (@Valid @RequestBody ProductoEntradaDTO productoEntradaDTO) {
        try {
            return new ResponseEntity<>(productoService.registrarProducto(productoEntradaDTO), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoSalidaDTO> buscarProductoXId (@PathVariable Long id) {
        return new ResponseEntity<>(productoService.buscarProductoXId(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarProducto (@RequestParam Long id) {
        productoService.eliminarProducto(id);
        return new ResponseEntity<>("Producto eliminado correctamente", HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoSalidaDTO> actualizarProducto(@RequestBody ProductoEntradaDTO productoEntradaDTO, @PathVariable Long id) {
        try {
            ProductoSalidaDTO productoActualizado = productoService.actualizarProducto(productoEntradaDTO, id);
            return ResponseEntity.ok(productoActualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{productoId}/agregar-caracteristicas")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Object> agregarCaracteristicas(@PathVariable Long productoId, @RequestBody List<Long> caracteristicaIds) {
        try {
            if (caracteristicaIds == null || caracteristicaIds.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("La lista de características no puede estar vacía.");
            }

            ProductoSalidaDTO productoSalidaDTO = productoService.agregarCaracteristicas(productoId, caracteristicaIds);
            return ResponseEntity.ok(productoSalidaDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al agregar las características al producto: " + e.getMessage());
        }
    }

}
