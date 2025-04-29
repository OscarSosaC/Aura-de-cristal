package com.auradecristal.aura_de_cristal.controller;

import com.auradecristal.aura_de_cristal.dto.entrada.TematicaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.TematicaSalidaDTO;
import com.auradecristal.aura_de_cristal.service.impl.TematicaService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tematicas")
@CrossOrigin
public class TematicaController {

    @Autowired
    private TematicaService tematicaService;

    public TematicaController(TematicaService tematicaService) {
        this.tematicaService = tematicaService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TematicaSalidaDTO>> listarTematicas () {
        return new ResponseEntity<>(tematicaService.listarTematicas(), HttpStatus.OK);
    }

    @PostMapping("/registrar")
    public ResponseEntity<TematicaSalidaDTO> registrarProductos (@Valid @RequestBody TematicaEntradaDTO tematicaEntradaDTO) {
        return new ResponseEntity<>(tematicaService.registrarTematica(tematicaEntradaDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TematicaSalidaDTO> buscarTematicaXId (@PathVariable Long id) {
        return new ResponseEntity<>(tematicaService.buscarTematicaXId(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarTematica (@RequestParam Long id) {
        tematicaService.eliminarTematica(id);
        return new ResponseEntity<>("Tematica eliminada correctamente", HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TematicaSalidaDTO> actualizarTematica(@RequestBody TematicaEntradaDTO tematicaEntradaDTO, @PathVariable Long id) {
        try {
            TematicaSalidaDTO tematicaActualizada = tematicaService.actualizarTematica(tematicaEntradaDTO, id);
            return ResponseEntity.ok(tematicaActualizada);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
