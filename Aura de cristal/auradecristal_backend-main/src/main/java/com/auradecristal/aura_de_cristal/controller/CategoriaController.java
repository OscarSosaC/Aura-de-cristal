package com.auradecristal.aura_de_cristal.controller;
import com.auradecristal.aura_de_cristal.dto.entrada.CategoriaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.CategoriaSalidaDTO;
import com.auradecristal.aura_de_cristal.service.impl.CategoriaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("categorias")
@CrossOrigin
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;
    private final Logger LOGGER = LoggerFactory.getLogger(CategoriaController.class);

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaSalidaDTO>> listarCategorias () {
        return new ResponseEntity<>(categoriaService.listarCategorias(), HttpStatus.OK);
    }

    @PostMapping("/registrar")
    public ResponseEntity<CategoriaSalidaDTO> registrarCategoria (@Valid @RequestBody CategoriaEntradaDTO categoriaEntradaDTO) {
        return new ResponseEntity<>(categoriaService.registrarCategoria(categoriaEntradaDTO), HttpStatus.CREATED);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<CategoriaSalidaDTO> buscarCategoriaXId (@PathVariable Long id) {
        return new ResponseEntity<>(categoriaService.buscarCategoriaXId(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarCategoria (@RequestParam Long id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.ok("Categoría eliminada con éxito.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaSalidaDTO> actualizarCategoria(@RequestBody CategoriaEntradaDTO categoriaEntradaDTO, @PathVariable Long id) {
        try {
            CategoriaSalidaDTO categoriaActualizada = categoriaService.actualizarCategoria(categoriaEntradaDTO, id);
            return ResponseEntity.ok(categoriaActualizada);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
