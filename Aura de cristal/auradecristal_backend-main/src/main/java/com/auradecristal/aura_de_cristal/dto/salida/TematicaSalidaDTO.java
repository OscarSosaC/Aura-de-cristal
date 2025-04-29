package com.auradecristal.aura_de_cristal.dto.salida;

public class TematicaSalidaDTO {

    private Long idTematica;
    private String descripcion;

    public TematicaSalidaDTO(Long idTematica, String descripcion) {
        this.idTematica = idTematica;
        this.descripcion = descripcion;
    }

    public TematicaSalidaDTO() {
    }

    public Long getIdTematica() {
        return idTematica;
    }

    public void setIdTematica(Long idTematica) {
        this.idTematica = idTematica;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
