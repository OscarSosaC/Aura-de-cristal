package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.ImagenEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ImagenSalidaDTO;
import com.auradecristal.aura_de_cristal.service.impl.ImagenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@RestController
@RequestMapping("imagenes")
@CrossOrigin
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ImagenSalidaDTO>> listarImagenes () {
        return new ResponseEntity<>(imagenService.listarImagenes(), HttpStatus.OK);
    }

    @PostMapping("/registrar")
    public ResponseEntity<ImagenSalidaDTO> registrarImagenes (@Valid @RequestBody ImagenEntradaDTO imagenEntradaDTO) {
        return new ResponseEntity<>(imagenService.registrarImagen(imagenEntradaDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagenSalidaDTO> buscarImagenXId (@PathVariable Long id) {
        return new ResponseEntity<>(imagenService.buscarImagenXId(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarImagen (@RequestParam Long id) {
        imagenService.eliminarImagen(id);
        return new ResponseEntity<>("Imagen eliminada correctamente", HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImagenSalidaDTO> actualizarImagen(@RequestBody ImagenEntradaDTO imagenEntradaDTO, @PathVariable Long id) {
        try {
            ImagenSalidaDTO imagenActualizada = imagenService.actualizarImagen(imagenEntradaDTO, id);
            return ResponseEntity.ok(imagenActualizada);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
