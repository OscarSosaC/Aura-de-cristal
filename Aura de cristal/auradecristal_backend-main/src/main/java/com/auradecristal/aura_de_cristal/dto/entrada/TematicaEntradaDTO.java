package com.auradecristal.aura_de_cristal.dto.entrada;

import jakarta.validation.constraints.NotBlank;

public class TematicaEntradaDTO {

    @NotBlank(message = "Debe escribir una descripcion de la tematica")
    private String descripcion;

    public TematicaEntradaDTO() {}

    public TematicaEntradaDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
