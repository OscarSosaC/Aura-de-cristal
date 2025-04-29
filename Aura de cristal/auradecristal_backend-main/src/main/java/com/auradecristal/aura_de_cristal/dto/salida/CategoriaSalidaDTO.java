package com.auradecristal.aura_de_cristal.dto.salida;

public class CategoriaSalidaDTO {

    private Long idCategoria;
    private String descripcion;

    public CategoriaSalidaDTO(Long idCategoria, String descripcion) {
        this.idCategoria = idCategoria;
        this.descripcion = descripcion;
    }

    public CategoriaSalidaDTO() {
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
