package com.auradecristal.aura_de_cristal.dto.salida;

import com.auradecristal.aura_de_cristal.dto.entrada.CategoriaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.entrada.ImagenEntradaDTO;
import com.auradecristal.aura_de_cristal.entity.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ProductoSalidaDTO {

    private Long idProducto;
    private String nombre;
    private String descripcion;
    private double precio_alquiler;
    private LocalDateTime fecha_registro;
    private CategoriaSalidaDTO categoria;
    private TematicaSalidaDTO tematica;
    private List<ImagenSalidaDTO> imagenes;
    private List<CaracteristicaSalidaDTO> caracteristicas;
    private List<ReservaSalidaDTO> reservas;

    public ProductoSalidaDTO(Long idProducto, String nombre, String descripcion, double precio_alquiler, LocalDateTime fecha_registro, Categoria categoria, Tematica tematica, List<Imagen> imagenes, List<Caracteristica> caracteristicas, List<ReservaSalidaDTO> reservas) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio_alquiler = precio_alquiler;
        this.fecha_registro = fecha_registro;
        this.categoria = new CategoriaSalidaDTO(categoria.getidCategoria(), categoria.getDescripcion());
        this.tematica = new TematicaSalidaDTO(tematica.getidTematica(), tematica.getDescripcion());
        this.imagenes = convertirListaImagenesAListaImagenesSalidaDTO(imagenes);
        this.caracteristicas = convertirListaCaracteristicasAListaCaracteristicaSalidaDTO(caracteristicas);
        this.reservas = reservas;
    }

    public List<ImagenSalidaDTO> convertirListaImagenesAListaImagenesSalidaDTO(List<Imagen> imagenes) {
        return imagenes.stream()
                .map(imagen -> new ImagenSalidaDTO(imagen.getIdImagen(), imagen.getUrl()))
                .toList();
    }

    public List<CaracteristicaSalidaDTO> convertirListaCaracteristicasAListaCaracteristicaSalidaDTO(List<Caracteristica> caracteristicas) {
        return caracteristicas.stream()
                .map(caracteristica -> new CaracteristicaSalidaDTO(
                        caracteristica.getIdCaracteristica(),
                        caracteristica.getDescripcion(),
                        caracteristica.getNombre(),
                        caracteristica.getProductos().stream()
                                .map(Producto::getIdProducto)
                                .collect(Collectors.toList())))
                .toList();
    }

    public ProductoSalidaDTO() {}

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
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

    public double getPrecio_alquiler() {
        return precio_alquiler;
    }

    public void setPrecio_alquiler(double precio_alquiler) {
        this.precio_alquiler = precio_alquiler;
    }

    public LocalDateTime getFecha_registro() {
        return fecha_registro;
    }

    public void setFecha_registro(LocalDateTime fecha_registro) {
        this.fecha_registro = fecha_registro;
    }

    public CategoriaSalidaDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaSalidaDTO categoria) {
        this.categoria = categoria;
    }

    public TematicaSalidaDTO getTematica() {
        return tematica;
    }

    public void setTematica(TematicaSalidaDTO tematica) {
        this.tematica = tematica;
    }

    public List<ImagenSalidaDTO> getImagenes() {
        return imagenes;
    }

    public void setImagenes(List<ImagenSalidaDTO> imagenes) {
        this.imagenes = imagenes;
    }

    public List<CaracteristicaSalidaDTO> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<CaracteristicaSalidaDTO> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public List<ReservaSalidaDTO> getReservas() {
        return reservas;
    }

    public void setReservas(List<ReservaSalidaDTO> reservas) {
        this.reservas = reservas;
    }
}
