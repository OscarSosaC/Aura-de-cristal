package com.auradecristal.aura_de_cristal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "imagen")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idImagen;
    @Column(length = 150)
    private String url;

    public Imagen() {
    }

    public Imagen(Long idImagen, String url) {
        this.idImagen = idImagen;
        this.url = url;
    }

    public Long getidImagen() {
        return idImagen;
    }

    public void setidImagen(Long idImagen) {
        this.idImagen = idImagen;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(Long idImagen) {
        this.idImagen = idImagen;
    }

}
