package com.auradecristal.aura_de_cristal.auth;

import com.auradecristal.aura_de_cristal.config.JwtService;
import com.auradecristal.aura_de_cristal.entity.Rol;
import com.auradecristal.aura_de_cristal.entity.Usuario;
import com.auradecristal.aura_de_cristal.repository.IUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final IUsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register (RegisterRequest request){
        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.USER)
                .build();
        Optional<Usuario> usuarioBD = usuarioRepository.findByEmail(usuario.getEmail());
        if(usuarioBD.isPresent()){
            throw  new IllegalArgumentException("El usuario ya existe.");
        }
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        String token = jwtService.generateToken(usuario);
        return AuthenticationResponse.builder()
                .token(token)
                .id(usuarioGuardado.getIdUsuario())
                .nombre(usuarioGuardado.getNombre())
                .apellido(usuarioGuardado.getApellido())
                .email(usuarioGuardado.getEmail())
                .rol(usuarioGuardado.getRol().name())
                .build();

    }

    public Usuario getUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElse(null);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("No existe el usuario"));

        // Generar el token JWT
        String token = jwtService.generateToken(usuario);

        // Construir la respuesta con los datos del usuario y el token
        return AuthenticationResponse.builder()
                .token(token)
                .id(usuario.getIdUsuario())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .rol(usuario.getRol().name())
                .build();
    }

}