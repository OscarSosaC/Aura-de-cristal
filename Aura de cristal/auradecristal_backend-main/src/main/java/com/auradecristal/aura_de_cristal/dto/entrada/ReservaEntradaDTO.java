package com.auradecristal.aura_de_cristal.dto.entrada;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public class ReservaEntradaDTO {

    @NotNull(message = "Debe especificarse el ID del producto.")
    private Long productoId;

    @NotNull(message = "Debe especificarse el ID del usuario.")
    private Long usuarioId;

    @NotNull(message = "Debe especificarse la fecha de inicio de la reserva.")
    @FutureOrPresent(message = "La fecha de inicio debe ser hoy o en el futuro.")
    private LocalDate fechaInicio;

    @NotNull(message = "Debe especificarse la fecha de fin de la reserva.")
    @FutureOrPresent(message = "La fecha de fin debe ser hoy o en el futuro.")
    private LocalDate fechaFin;

    public ReservaEntradaDTO() {
    }

    // Constructor
    public ReservaEntradaDTO(Long productoId, Long usuarioId, LocalDate fechaInicio, LocalDate fechaFin) {
        this.productoId = productoId;
        this.usuarioId = usuarioId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    // Getters y Setters
    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }
}
