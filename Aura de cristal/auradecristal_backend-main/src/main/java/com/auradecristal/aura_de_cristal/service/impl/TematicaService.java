package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.TematicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.TematicaSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Tematica;
import com.auradecristal.aura_de_cristal.repository.ITematicaRepository;
import com.auradecristal.aura_de_cristal.service.ITematicaService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TematicaService implements ITematicaService {

    @Autowired
    private ITematicaRepository tematicaRepository;
    @Autowired
    private ModelMapper modelMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(CategoriaService.class);

    public TematicaService(ITematicaRepository tematicaRepository, ModelMapper modelMapper) {
        this.tematicaRepository = tematicaRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TematicaSalidaDTO> listarTematicas() {
        List<TematicaSalidaDTO> tematicas = tematicaRepository.findAll()
                .stream()
                .map(tematica -> modelMapper.map(tematica, TematicaSalidaDTO.class))
                .toList();
        LOGGER.info("Listado de todas las tematicas: {}", tematicas);
        return tematicas;
    }

    @Override
    public TematicaSalidaDTO registrarTematica(TematicaEntradaDTO tematicaEntradaDTO) {
        LOGGER.info("TematicaEncontradaDTO: " + JsonPrinter.toString(tematicaEntradaDTO));
        Tematica tematica = modelMapper.map(tematicaEntradaDTO, Tematica.class);
        LOGGER.info("TematicaEntity: " + JsonPrinter.toString(tematica));

        TematicaSalidaDTO tematicaSalidaDTO = modelMapper.map(tematicaRepository.save(tematica), TematicaSalidaDTO.class);
        LOGGER.info("TematicaSalidaDto: " + JsonPrinter.toString(tematicaSalidaDTO));
        return tematicaSalidaDTO;
    }

    @Override
    public TematicaSalidaDTO buscarTematicaXId(Long id) {
        Tematica tematicaBuscada = tematicaRepository.findById(id).orElse(null);
        TematicaSalidaDTO tematicaEncontrada = null;

        if (tematicaBuscada != null){
            tematicaEncontrada = modelMapper.map(tematicaBuscada, TematicaSalidaDTO.class);
            LOGGER.info("Tematica encontrada: {}", JsonPrinter.toString(tematicaEncontrada));
        } else {
            LOGGER.info("Tematica no encontrado: {}");
        }

        return tematicaEncontrada;
    }

    @Override
    public void eliminarTematica(Long id) {
        if (buscarTematicaXId(id) != null) {
            tematicaRepository.deleteById(id);
            LOGGER.info("Tematica eliminada con id: {}", id);
        } else {
            LOGGER.info("Tematica no encontrado para eliminar: {}", id);
        }
    }

    @Override
    public TematicaSalidaDTO actualizarTematica(TematicaEntradaDTO tematicaEntradaDTO, Long id) {

        Tematica tematicaAActualizar = tematicaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La temática con id '" + id + "' no existe."));
        tematicaAActualizar.setDescripcion(tematicaEntradaDTO.getDescripcion());
        tematicaRepository.save(tematicaAActualizar);

        TematicaSalidaDTO tematicaSalidaDTO = modelMapper.map(tematicaAActualizar, TematicaSalidaDTO.class);
        LOGGER.warn("Temática actualizada: {}", JsonPrinter.toString(tematicaSalidaDTO));

        return tematicaSalidaDTO;
    }

}
