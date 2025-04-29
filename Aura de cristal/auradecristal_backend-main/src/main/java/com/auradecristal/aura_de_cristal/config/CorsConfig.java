package com.auradecristal.aura_de_cristal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/** ") //aca van dos asteriscos
                .allowedOriginPatterns(" * ") // Por ahora para recibir peticiones de cualquier lado
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*") //
                .allowCredentials(true); //aca iria true en vez de false*
    }
}