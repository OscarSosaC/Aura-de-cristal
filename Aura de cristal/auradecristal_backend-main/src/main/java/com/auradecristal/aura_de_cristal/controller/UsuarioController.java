package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.UsuarioEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.UsuarioSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Rol;
import com.auradecristal.aura_de_cristal.service.impl.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("usuarios")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    private final Logger LOGGER = LoggerFactory.getLogger(UsuarioController.class);

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioSalidaDTO>> listarUsuarios () {
        return new ResponseEntity<>(usuarioService.listarUsuarios(), HttpStatus.OK);
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarUsuarioXEmail(@RequestParam String email) {
        try {
            LOGGER.info("Email buscado: " + email);
            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("El campo 'email' es obligatorio.");
            }
            UsuarioSalidaDTO usuario = usuarioService.buscarUsuarioXEmail(email);
            return ResponseEntity.ok(usuario);

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email inválido: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error inesperado al procesar la solicitud.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDTO> actualizarUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioEntradaDTO usuarioEntradaDTO) {
        try {
            UsuarioSalidaDTO usuarioActualizado = usuarioService.actualizarUsuario(id, usuarioEntradaDTO);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> obtenerRoles() {
        List<String> roles = Arrays.stream(Rol.values())
                .map(Enum::name)
                .toList();
        return ResponseEntity.ok(roles);
    }

}
