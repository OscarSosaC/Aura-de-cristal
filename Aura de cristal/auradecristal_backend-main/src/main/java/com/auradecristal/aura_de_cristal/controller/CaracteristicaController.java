package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.CaracteristicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.service.ICaracteristicaService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("caracteristicas")
@CrossOrigin
public class CaracteristicaController {

    private final ICaracteristicaService caracteristicaService;
    private final Logger LOGGER = LoggerFactory.getLogger(CaracteristicaController.class);

    public CaracteristicaController(ICaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    /**
     * Listar todas las características.
     */
    @GetMapping("/listar")
    public ResponseEntity<List<CaracteristicaSalidaDTO>> listarCaracteristicas() {
        try {
            List<CaracteristicaSalidaDTO> caracteristicas = caracteristicaService.listarCaracteristicas();
            return ResponseEntity.ok(caracteristicas);
        } catch (Exception e) {
            LOGGER.error("Error al listar características", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Registrar una nueva característica.
     */
    @PostMapping("/registrar")
    public ResponseEntity<CaracteristicaSalidaDTO> registrarCaracteristica(@RequestBody CaracteristicaEntradaDTO caracteristicaEntradaDTO) {
        try {
            CaracteristicaSalidaDTO caracteristicaSalidaDTO = caracteristicaService.registrarCaracteristica(caracteristicaEntradaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(caracteristicaSalidaDTO);
        } catch (Exception e) {
            LOGGER.error("Error al registrar la característica", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Buscar una característica por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CaracteristicaSalidaDTO> buscarCaracteristica(@PathVariable Long id) {
        try {
            CaracteristicaSalidaDTO caracteristica = caracteristicaService.buscarCaracteristicaXId(id);
            return ResponseEntity.ok(caracteristica);
        } catch (EntityNotFoundException e) {
            LOGGER.warn("Característica no encontrada con ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            LOGGER.error("Error al buscar característica con ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Eliminar una característica por su ID.
     */
    @DeleteMapping("/eliminar")
    public ResponseEntity<Void> eliminarCaracteristica(@PathVariable Long id) {
        try {
            caracteristicaService.eliminarCaracteristica(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException e) {
            LOGGER.warn("Característica no encontrada con ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            LOGGER.error("Error al eliminar característica con ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Actualizar una característica.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CaracteristicaSalidaDTO> actualizarCaracteristica(
            @PathVariable Long id, @RequestBody CaracteristicaEntradaDTO caracteristicaEntradaDTO) {
        try {
            CaracteristicaSalidaDTO caracteristicaActualizada = caracteristicaService.actualizarCaracteristicas(caracteristicaEntradaDTO, id);
            return ResponseEntity.ok(caracteristicaActualizada);
        } catch (EntityNotFoundException e) {
            LOGGER.warn("Característica no encontrada con ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            LOGGER.error("Error al actualizar la característica con ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
