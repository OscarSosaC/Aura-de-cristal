package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.ImagenEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Imagen;
import com.auradecristal.aura_de_cristal.repository.IImagenRepository;
import com.auradecristal.aura_de_cristal.repository.IProductoRepository;
import com.auradecristal.aura_de_cristal.service.IImagenService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    private IImagenRepository imagenRepository;
    @Autowired
    private IProductoRepository productoRepository;
    @Autowired
    private ModelMapper modelMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(CategoriaService.class);

    public ImagenService(IImagenRepository imagenRepository, IProductoRepository productoRepository, ModelMapper modelMapper) {
        this.imagenRepository = imagenRepository;
        this.productoRepository = productoRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ImagenSalidaDTO> listarImagenes() {
        List<ImagenSalidaDTO> imagenes = imagenRepository.findAll()
                .stream()
                .map(imagen -> modelMapper.map(imagen, ImagenSalidaDTO.class))
                .toList();
        LOGGER.info("Listado de todos las imagenes: {}", JsonPrinter.toString(imagenes));
        return imagenes;
    }

    @Override
    public ImagenSalidaDTO registrarImagen(ImagenEntradaDTO imagenEntradaDTO) {
        LOGGER.info("ImagenEntradaDTO: " + JsonPrinter.toString(imagenEntradaDTO));
        Imagen imagen = modelMapper.map(imagenEntradaDTO, Imagen.class);
        LOGGER.info("ImagenEntity: " + JsonPrinter.toString(imagen));

        ImagenSalidaDTO imagenSalidaDTO = modelMapper.map(imagenRepository.save(imagen), ImagenSalidaDTO.class);
        LOGGER.info("ImagenSalidaDTO: " + JsonPrinter.toString(imagenSalidaDTO));
        return imagenSalidaDTO;
    }

    @Override
    public ImagenSalidaDTO buscarImagenXId(Long id) {
        Imagen imagenBuscada = imagenRepository.findById(id).orElse(null);
        ImagenSalidaDTO imagenEncontrada = null;

        if (imagenBuscada != null){
            imagenEncontrada = modelMapper.map(imagenBuscada, ImagenSalidaDTO.class);
            LOGGER.info("Imagen encontrada: {}", JsonPrinter.toString(imagenEncontrada));
        } else {
            LOGGER.info("Imagen no encontrada: {}");
        }

        return imagenEncontrada;
    }

    @Override
    public void eliminarImagen(Long id) {
        if (buscarImagenXId(id) != null) {
            imagenRepository.deleteById(id);
            LOGGER.info("Imagen eliminada con id: {}", id);
        } else {
            LOGGER.info("Imagen no encontrada para eliminar: {}", id);
        }
    }

    @Override
    public ImagenSalidaDTO actualizarImagen(ImagenEntradaDTO imagenEntradaDTO, Long id) {
        Imagen imagenAActualizar = imagenRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La imagen con id '" + id + "' no existe."));

        imagenAActualizar.setUrl(imagenEntradaDTO.getUrl());
        imagenRepository.save(imagenAActualizar);

        ImagenSalidaDTO imagenSalidaDTO = modelMapper.map(imagenAActualizar, ImagenSalidaDTO.class);
        LOGGER.warn("Imagen actualizada: {}", JsonPrinter.toString(imagenSalidaDTO));

        return imagenSalidaDTO;
    }

}
