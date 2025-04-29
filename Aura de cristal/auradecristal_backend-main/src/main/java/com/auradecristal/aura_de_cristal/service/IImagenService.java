package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.ImagenEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;

import java.util.List;

public interface IImagenService {
    List<ImagenSalidaDTO> listarImagenes();
    ImagenSalidaDTO registrarImagen(ImagenEntradaDTO imagenEntradaDTO);
    ImagenSalidaDTO buscarImagenXId(Long id);
    void eliminarImagen(Long id);
    ImagenSalidaDTO actualizarImagen(ImagenEntradaDTO imagenEntradaDTO, Long id);
}
