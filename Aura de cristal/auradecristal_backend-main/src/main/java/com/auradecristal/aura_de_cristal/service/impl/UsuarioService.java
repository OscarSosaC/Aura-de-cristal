package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.UsuarioEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.UsuarioSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Rol;
import com.auradecristal.aura_de_cristal.entity.Usuario;
import com.auradecristal.aura_de_cristal.repository.IUsuarioRepository;
import com.auradecristal.aura_de_cristal.service.IUsuarioService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final Logger LOGGER = LoggerFactory.getLogger(UsuarioService.class);

    public UsuarioService(IUsuarioRepository usuarioRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        configureMapping();
    }

    @Override
    public List<UsuarioSalidaDTO> listarUsuarios() {
        List<UsuarioSalidaDTO> usuarios = usuarioRepository.findAll()
                .stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioSalidaDTO.class))
                .toList();
        LOGGER.info("Listado de todos los usuarios: {}", JsonPrinter.toString(usuarios));
        return usuarios;
    }

    @Override
    public UsuarioSalidaDTO buscarUsuarioXEmail(String email) {
        try {
            if (email == null || email.trim().isEmpty()) {
                throw new IllegalArgumentException("El email no puede ser nulo o vacío.");
            }

            Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
            if (usuarioOptional.isEmpty()) {
                LOGGER.warn("No se encontró un usuario con el email: {}", email);
                throw new EntityNotFoundException("Usuario no encontrado con email: " + email);
            }

            Usuario usuario = usuarioOptional.get();
            UsuarioSalidaDTO usuarioDTO = modelMapper.map(usuario, UsuarioSalidaDTO.class);

            LOGGER.info("Usuario encontrado: {}", JsonPrinter.toString(usuarioDTO));
            return usuarioDTO;

        } catch (IllegalArgumentException e) {
            LOGGER.error("Entrada inválida: {}", e.getMessage());
            throw e;
        } catch (EntityNotFoundException e) {
            LOGGER.warn("Error de entidad no encontrada: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            LOGGER.error("Error inesperado al buscar usuario: {}", e.getMessage());
            throw new RuntimeException("Error inesperado al buscar usuario.", e);
        }
    }

    @Override
    public UsuarioSalidaDTO actualizarUsuario(Long id, UsuarioEntradaDTO usuarioActualizadoDTO) {
        try {

            Usuario usuarioExistente = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

            usuarioExistente.setNombre(usuarioActualizadoDTO.getNombre());
            usuarioExistente.setApellido(usuarioActualizadoDTO.getApellido());
            usuarioExistente.setEmail(usuarioActualizadoDTO.getEmail());

            if (usuarioActualizadoDTO.getPassword() != null && !usuarioActualizadoDTO.getPassword().isEmpty()) {
                usuarioExistente.setPassword(passwordEncoder.encode(usuarioActualizadoDTO.getPassword()));
            }

            //Validacion para que el rol asignado si correponda
            if (Arrays.stream(Rol.values()).noneMatch(r -> r.name().equalsIgnoreCase(usuarioActualizadoDTO.getRol()))) {
                throw new IllegalArgumentException("Rol inválido: " + usuarioActualizadoDTO.getRol());
            }
            usuarioExistente.setRol(Rol.valueOf(usuarioActualizadoDTO.getRol().toUpperCase()));

            Usuario usuarioGuardado = usuarioRepository.save(usuarioExistente);
            return modelMapper.map(usuarioGuardado, UsuarioSalidaDTO.class);

        } catch (IllegalArgumentException e) {
            LOGGER.error("Rol inválido proporcionado: {}", usuarioActualizadoDTO.getRol());
            throw new RuntimeException("El rol proporcionado no es válido.", e);
        } catch (RuntimeException e) {
            LOGGER.error("Error de negocio al actualizar usuario: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            LOGGER.error("Error inesperado al actualizar usuario: {}", e.getMessage());
            throw new RuntimeException("Error al actualizar usuario.", e);
        }
    }


    private void configureMapping() {
        modelMapper.typeMap(Usuario.class, UsuarioSalidaDTO.class)
                .addMappings(mapper -> {
                    mapper.map(Usuario::getIdUsuario, UsuarioSalidaDTO::setIdUsuario);
                    mapper.map(Usuario::getApellido, UsuarioSalidaDTO::setApellido);
                    mapper.map(Usuario::getNombre, UsuarioSalidaDTO::setNombre);
                    mapper.map(Usuario::getEmail, UsuarioSalidaDTO::setEmail);
                    mapper.map(usuario ->
                                    usuario.getRol() != null ? usuario.getRol().name() : "SIN_ROL",
                            UsuarioSalidaDTO::setRol
                    );
                    mapper.map(Usuario::getReservas, UsuarioSalidaDTO::setReservas);
                });
    }
}
