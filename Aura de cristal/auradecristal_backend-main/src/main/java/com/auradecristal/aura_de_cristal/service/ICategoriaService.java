package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.CategoriaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CategoriaSalidaDTO;

import java.util.List;

public interface ICategoriaService {

    List<CategoriaSalidaDTO> listarCategorias();
    CategoriaSalidaDTO registrarCategoria(CategoriaEntradaDTO categoriaEntradaDTO);
    CategoriaSalidaDTO buscarCategoriaXId(Long id);
    void eliminarCategoria(Long id);
    CategoriaSalidaDTO actualizarCategoria(CategoriaEntradaDTO categoriaEntradaDTO, Long id);
}
