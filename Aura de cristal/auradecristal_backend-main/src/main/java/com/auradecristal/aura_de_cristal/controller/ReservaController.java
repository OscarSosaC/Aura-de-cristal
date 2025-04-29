package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.ReservaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ReservaSalidaDTO;
import com.auradecristal.aura_de_cristal.service.impl.ReservaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reservas")
@CrossOrigin
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarReserva(@RequestBody ReservaEntradaDTO reservaEntradaDTO) {
        try {
            ReservaSalidaDTO reservaSalidaDTO = reservaService.registrarReserva(reservaEntradaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(reservaSalidaDTO); // HTTP 201
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // HTTP 404
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); // HTTP 400
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar la reserva:\n" + e.getMessage()); // HTTP 500
        }
    }

    // Buscar reservas por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> buscarReservasPorUsuario(@PathVariable Long usuarioId) {
        try {
            List<ReservaSalidaDTO> reservas = reservaService.buscarReservasXUsuarioId(usuarioId);
            if (reservas.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // HTTP 204
            }
            return ResponseEntity.ok(reservas); // HTTP 200
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // HTTP 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al buscar reservas"); // HTTP 500
        }
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<?> buscarReservasPorProducto(@PathVariable Long productoId) {
        try {
            List<ReservaSalidaDTO> reservas = reservaService.buscarReservasXProductoId(productoId);
            if (reservas.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // HTTP 204
            }
            return ResponseEntity.ok(reservas); // HTTP 200
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // HTTP 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al buscar reservas"); // HTTP 500
        }
    }

    // Eliminar una reserva por su ID
    @DeleteMapping("/{idReserva}")
    public ResponseEntity<?> eliminarReserva(@PathVariable Long idReserva) {
        try {
            reservaService.eliminarReserva(idReserva);
            return ResponseEntity.noContent().build(); // HTTP 204
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // HTTP 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la reserva"); // HTTP 500
        }
    }

    // Actualizar una reserva existente
    @PutMapping("/{idReserva}")
    public ResponseEntity<?> actualizarReserva(
            @RequestBody ReservaEntradaDTO reservaEntradaDTO,
            @PathVariable Long idReserva) {
        try {
            ReservaSalidaDTO reservaSalidaDTO = reservaService.actualizarReserva(reservaEntradaDTO, idReserva);
            return ResponseEntity.ok(reservaSalidaDTO); // HTTP 200
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // HTTP 404
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la reserva"); // HTTP 500
        }
    }
}
