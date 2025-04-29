package com.auradecristal.aura_de_cristal.dto.entrada;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoriaEntradaDTO {

    @NotBlank(message = "Debe escribir una descripcion de la categoria")
    @Size(max = 50, message = "La descripcion debe tener hasta 50 caracteres")
    private String descripcion;

    public CategoriaEntradaDTO() {}

    public CategoriaEntradaDTO(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
