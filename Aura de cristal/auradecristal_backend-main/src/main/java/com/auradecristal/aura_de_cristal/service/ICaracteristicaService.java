package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.CaracteristicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.entrada.CategoriaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CaracteristicaSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CategoriaSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Categoria;

import java.util.List;

public interface ICaracteristicaService {
    List<CaracteristicaSalidaDTO> listarCaracteristicas();
    CaracteristicaSalidaDTO registrarCaracteristica(CaracteristicaEntradaDTO caracteristicaEntradaDTO);
    CaracteristicaSalidaDTO buscarCaracteristicaXId(Long id);
    void eliminarCaracteristica(Long id);
    CaracteristicaSalidaDTO actualizarCaracteristicas(CaracteristicaEntradaDTO caracteristicaEntradaDTO, Long id);
}
