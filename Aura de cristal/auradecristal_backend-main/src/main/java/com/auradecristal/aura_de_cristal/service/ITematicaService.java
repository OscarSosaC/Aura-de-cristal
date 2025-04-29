package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.TematicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.TematicaSalidaDTO;

import java.util.List;

public interface ITematicaService {

    List<TematicaSalidaDTO> listarTematicas();
    TematicaSalidaDTO registrarTematica(TematicaEntradaDTO tematicaEntradaDTO);
    TematicaSalidaDTO buscarTematicaXId(Long id);
    void eliminarTematica(Long id);
    TematicaSalidaDTO actualizarTematica(TematicaEntradaDTO tematicaEntradaDTO, Long id);
}
