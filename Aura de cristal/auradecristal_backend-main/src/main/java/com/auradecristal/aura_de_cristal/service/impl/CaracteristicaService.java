package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.CaracteristicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Caracteristica;
import com.auradecristal.aura_de_cristal.repository.ICaracteristicaRepository;
import com.auradecristal.aura_de_cristal.service.ICaracteristicaService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaracteristicaService implements ICaracteristicaService {

    @Autowired
    private ICaracteristicaRepository caracteristicaRepository;
    @Autowired
    private ModelMapper modelMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(CaracteristicaService.class);

    public CaracteristicaService(ICaracteristicaRepository caracteristicaRepository, ModelMapper modelMapper) {
        this.caracteristicaRepository = caracteristicaRepository;
        this.modelMapper = modelMapper;
        configureMapping();
    }


    @Override
    public List<CaracteristicaSalidaDTO> listarCaracteristicas() {
        List<CaracteristicaSalidaDTO> caracteristicas = caracteristicaRepository.findAll()
                .stream()
                .map(caracteristica -> modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class))
                .toList();
        LOGGER.info("Listado de todas las caracteristicas: {}", JsonPrinter.toString(caracteristicas));
        return caracteristicas;
    }

    @Override
    public CaracteristicaSalidaDTO registrarCaracteristica(CaracteristicaEntradaDTO caracteristicaEntradaDTO) {
        Caracteristica caracteristica = modelMapper.map(caracteristicaEntradaDTO, Caracteristica.class);
        Caracteristica caracteristicaGuardada = caracteristicaRepository.save(caracteristica);

        CaracteristicaSalidaDTO caracteristicaSalidaDTO = modelMapper.map(caracteristicaGuardada, CaracteristicaSalidaDTO.class);
        LOGGER.info("Característica registrada: {}", JsonPrinter.toString(caracteristicaSalidaDTO));
        return caracteristicaSalidaDTO;
    }

    @Override
    public CaracteristicaSalidaDTO buscarCaracteristicaXId(Long id) {
        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La característica con id '" + id + "' no existe."));
        CaracteristicaSalidaDTO caracteristicaSalidaDTO = modelMapper.map(caracteristica, CaracteristicaSalidaDTO.class);
        LOGGER.info("Característica encontrada: {}", JsonPrinter.toString(caracteristicaSalidaDTO));
        return caracteristicaSalidaDTO;
    }

    @Override
    public void eliminarCaracteristica(Long id) {
        if (!caracteristicaRepository.existsById(id)) {
            throw new EntityNotFoundException("Característica con ID " + id + " no encontrada para eliminar.");
        }
        caracteristicaRepository.deleteById(id);
        LOGGER.info("Característica eliminada con ID: {}", id);
    }

    @Override
    public CaracteristicaSalidaDTO actualizarCaracteristicas(CaracteristicaEntradaDTO caracteristicaEntradaDTO, Long id) {
        Caracteristica caracteristicaExistente = caracteristicaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La característica con id '" + id + "' no existe."));
        caracteristicaExistente.setDescripcion(caracteristicaEntradaDTO.getDescripcion());
        caracteristicaExistente.setNombre(caracteristicaEntradaDTO.getNombre());
        Caracteristica caracteristicaActualizada = caracteristicaRepository.save(caracteristicaExistente);

        CaracteristicaSalidaDTO caracteristicaSalidaDTO = modelMapper.map(caracteristicaActualizada, CaracteristicaSalidaDTO.class);
        LOGGER.warn("Característica actualizada: {}", JsonPrinter.toString(caracteristicaSalidaDTO));

        return caracteristicaSalidaDTO;
    }

    /**
     * Configuracion del mapper para asignar el valor del atributo Producto para personalizar
     * cómo los objetos se convierten entre sí, específicamente entre CaracteristicaEntradaDto y
     * Caracteristica, y entre Caracteristica y CaracteristicaSalidaDto.
     */
    private void configureMapping() {
        modelMapper.typeMap(CaracteristicaSalidaDTO.class, Caracteristica.class)
                .addMappings(mapper -> {
                    mapper.map(CaracteristicaSalidaDTO::getNombre, Caracteristica::setNombre);
                    mapper.map(CaracteristicaSalidaDTO::getDescripcion, Caracteristica::setDescripcion);
                });

            modelMapper.typeMap(Caracteristica.class, CaracteristicaSalidaDTO.class)
                .addMappings(mapper -> mapper.map(Caracteristica::getNombre, CaracteristicaSalidaDTO::setNombre))
                .addMappings(mapper -> mapper.map(Caracteristica::getDescripcion, CaracteristicaSalidaDTO::setDescripcion))
                .addMappings(mapper -> mapper.map(Caracteristica::getProductosIds, CaracteristicaSalidaDTO::setProductoIds));
    }
}

