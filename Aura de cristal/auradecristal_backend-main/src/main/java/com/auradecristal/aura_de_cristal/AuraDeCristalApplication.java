package com.auradecristal.aura_de_cristal;

import com.auradecristal.aura_de_cristal.entity.*;
import com.auradecristal.aura_de_cristal.repository.IUsuarioRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AuraDeCristalApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuraDeCristalApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AuraDeCristalApplication.class, args);
		LOGGER.info("Aura de Cristal iniciado correctamente!!!");
	}

	@Bean
	public ModelMapper modelMapper (){
		return new ModelMapper();
	}

	@Bean
	CommandLineRunner init(IUsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){
		return args -> {
			if(usuarioRepository.findByEmail("admin@admin.com").isEmpty()){
				Usuario admin = new Usuario();
				admin.setEmail("admin@admin.com");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setNombre("admin");
				admin.setApellido("admin");
				admin.setRol(Rol.ADMIN);
				usuarioRepository.save(admin);
			}
		};
	}

}
