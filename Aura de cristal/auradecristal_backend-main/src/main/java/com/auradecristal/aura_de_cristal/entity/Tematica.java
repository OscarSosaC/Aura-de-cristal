package com.auradecristal.aura_de_cristal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tematica")
public class Tematica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTematica;
    @Column(length = 50)
    private String descripcion;

    public Tematica() { }

    public Tematica(Long idTematica, String descripcion) {
        this.idTematica = idTematica;
        this.descripcion = descripcion;
    }

    public Long getidTematica() {
        return idTematica;
    }

    public void setidTematica(Long idTematica) {
        this.idTematica = idTematica;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
