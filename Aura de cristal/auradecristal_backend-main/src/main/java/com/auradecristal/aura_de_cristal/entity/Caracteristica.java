package com.auradecristal.aura_de_cristal.entity;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "caracteristica")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCaracteristica;
    @Column(length = 150)
    private String nombre;
    @Column(length = 300)
    private String descripcion;
    @ManyToMany(mappedBy = "caracteristicas")
    private Set<Producto> productos;

    public Caracteristica() {}

    public Caracteristica(Long idCaracteristica, String nombre, String descripcion, Set<Producto> productos) {
        this.idCaracteristica = idCaracteristica;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.productos = productos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getIdCaracteristica() {
        return idCaracteristica;
    }

    public void setIdCaracteristica(Long idCaracteristica) {
        this.idCaracteristica = idCaracteristica;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }

    public List<Long> getProductosIds() {
        return productos.stream().map(Producto::getIdProducto).collect(Collectors.toList());
    }
}
