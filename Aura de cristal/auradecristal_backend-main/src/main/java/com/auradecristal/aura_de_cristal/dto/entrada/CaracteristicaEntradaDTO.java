package com.auradecristal.aura_de_cristal.dto.entrada;

import jakarta.validation.constraints.NotBlank;

public class CaracteristicaEntradaDTO {

    @NotBlank(message = "Debe especificarse el nombre de la caracteristica")
    private String nombre;
    @NotBlank(message = "Debe especificarse la descripcion de la caracteristica")
    private String descripcion;

    public CaracteristicaEntradaDTO() {}

    public CaracteristicaEntradaDTO(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
