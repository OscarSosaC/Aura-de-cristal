package com.auradecristal.aura_de_cristal.dto.salida;

import java.time.LocalDate;

public class ReservaSalidaDTO {

    private Long idReserva;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Long productoId;
    private Long usuarioId;

    public ReservaSalidaDTO() {
    }

    // Constructor
    public ReservaSalidaDTO(Long idReserva, LocalDate fechaInicio, LocalDate fechaFin, Long productoId, Long usuarioId) {
        this.idReserva = idReserva;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.productoId = productoId;
        this.usuarioId = usuarioId;
    }

    // Getters y Setters
    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
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
}