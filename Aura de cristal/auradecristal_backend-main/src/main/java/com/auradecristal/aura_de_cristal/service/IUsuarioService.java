package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.CategoriaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.entrada.UsuarioEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CategoriaSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.UsuarioSalidaDTO;

import java.util.List;

public interface IUsuarioService {
    List<UsuarioSalidaDTO> listarUsuarios();
    UsuarioSalidaDTO buscarUsuarioXEmail(String email);
    UsuarioSalidaDTO actualizarUsuario(Long id, UsuarioEntradaDTO usuarioEntradaDTO);
}
