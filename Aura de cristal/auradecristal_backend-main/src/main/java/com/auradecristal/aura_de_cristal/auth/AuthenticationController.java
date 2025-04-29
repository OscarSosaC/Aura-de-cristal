package com.auradecristal.aura_de_cristal.auth;

import com.auradecristal.aura_de_cristal.entity.Usuario;
import com.auradecristal.aura_de_cristal.service.IEmailService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {
  
    private final AuthenticationService authenticationService;
    @Autowired
    private IEmailService emailService;
    private Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    ResponseEntity<?> register(@RequestBody RegisterRequest request){
        LOGGER.info("Peticion POST register: {}", JsonPrinter.toString(request));
        try {
            AuthenticationResponse response = authenticationService.register(request);
            LOGGER.info("Peticion POST register response: {}", JsonPrinter.toString(response));
            emailService.enviarCorreoRegistro(request.getNombre() + " " + request.getApellido(), request.getEmail());
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            LOGGER.error("Peticion POST register error: {}", JsonPrinter.toString(e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/resend-email")
    ResponseEntity<?> resendEmail(@RequestParam String email) {
        LOGGER.info("Petición POST resend-email para: {}", email);
        try {
            // Verificar si el usuario existe
            Usuario usuario = authenticationService.getUsuarioPorEmail(email);
            if (usuario == null) {
                String mensajeError = "No existe un usuario registrado con el correo: " + email;
                LOGGER.warn(mensajeError);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensajeError);
            }

            // Reenviar el correo
            emailService.enviarCorreoRegistro(usuario.getNombre() + " " + usuario.getApellido(), email);
            LOGGER.info("Correo reenviado exitosamente a: {}", email);
            return ResponseEntity.ok("Correo reenviado exitosamente a: " + email);
        } catch (Exception e) {
            LOGGER.error("Error al reenviar el correo: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al reenviar el correo: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody AuthenticationRequest request){
        LOGGER.info("Peticion POST login: {}", JsonPrinter.toString(request));
        try{
            AuthenticationResponse response = authenticationService.login(request);
            LOGGER.info("Peticion POST login response: {}", JsonPrinter.toString(response));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e){
            System.out.println("Error: " + e.getMessage());
            LOGGER.error("Peticion POST login error: {}", JsonPrinter.toString(e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}