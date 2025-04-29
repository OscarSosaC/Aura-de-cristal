package com.auradecristal.aura_de_cristal.dto.salida;

public class ImagenSalidaDTO {

    private Long idImagen;
    private String url;

    public ImagenSalidaDTO() {
    }

    public ImagenSalidaDTO(Long idImagen, String url) {
        this.idImagen = idImagen;
        this.url = url;
    }

    public Long getIdImagen() {
        return idImagen;
    }

    public void setIdImagen(Long idImagen) {
        this.idImagen = idImagen;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
