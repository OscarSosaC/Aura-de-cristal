package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.entrada.ReservaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ReservaSalidaDTO;
import com.auradecristal.aura_de_cristal.entity.Producto;
import com.auradecristal.aura_de_cristal.entity.Reserva;
import com.auradecristal.aura_de_cristal.entity.Usuario;
import com.auradecristal.aura_de_cristal.repository.IProductoRepository;
import com.auradecristal.aura_de_cristal.repository.IReservaRepository;
import com.auradecristal.aura_de_cristal.repository.IUsuarioRepository;
import com.auradecristal.aura_de_cristal.service.IEmailService;
import com.auradecristal.aura_de_cristal.service.IReservaService;
import com.auradecristal.aura_de_cristal.util.JsonPrinter;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService implements IReservaService {

    @Autowired
    private IReservaRepository reservaRepository;
    @Autowired
    private IProductoRepository productoRepository;
    @Autowired
    private IUsuarioRepository usuarioRepository;
    @Autowired
    private IEmailService emailService;
    @Autowired
    private ModelMapper modelMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(ReservaService.class);

    public ReservaService(IReservaRepository reservaRepository, IProductoRepository productoRepository, IUsuarioRepository usuarioRepository, IEmailService emailService, ModelMapper modelMapper) {
        this.reservaRepository = reservaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
        this.modelMapper = modelMapper;
        configureMapping();
    }

    @Override
    public ReservaSalidaDTO registrarReserva(ReservaEntradaDTO reservaEntradaDTO) {
        Reserva reserva = modelMapper.map(reservaEntradaDTO, Reserva.class);

        Producto producto = productoRepository.findById(reservaEntradaDTO.getProductoId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        Usuario usuario = usuarioRepository.findById(reservaEntradaDTO.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        List<Reserva> reservasConflictivas = reservaRepository.validarReservasEnRango(reservaEntradaDTO.getProductoId(), reservaEntradaDTO.getFechaInicio(), reservaEntradaDTO.getFechaFin());

        if (!reservasConflictivas.isEmpty()) {
            throw new IllegalArgumentException("El producto ya está reservado en las fechas seleccionadas.");
        }

        reserva.setProducto(producto);
        reserva.setUsuario(usuario);

        Reserva reservaGuardada = reservaRepository.save(reserva);
        ReservaSalidaDTO reservaSalidaDTO = modelMapper.map(reservaGuardada, ReservaSalidaDTO.class);
        LOGGER.info("ReservaSalidaDTO: " + JsonPrinter.toString(reservaSalidaDTO));

        emailService.enviarCorreoConfirmacionReservaProducto(usuario.getNombre(), usuario.getEmail(), producto.getNombre(), reservaSalidaDTO);

        return reservaSalidaDTO;

    }

    @Override
    public List<ReservaSalidaDTO> buscarReservasXUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        List<Reserva> reservas = reservaRepository.findByUsuario_IdUsuario(usuario.getIdUsuario());

        if (reservas.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron reservas para el usuario con ID: " + usuarioId);
        }

        List<ReservaSalidaDTO> reservasSalidaDTO = reservas.stream()
                .map(reserva -> modelMapper.map(reserva, ReservaSalidaDTO.class))
                .toList();

        LOGGER.info("Reservas encontradas para el usuario {}: {}", usuarioId, JsonPrinter.toString(reservasSalidaDTO));
        return reservasSalidaDTO;
    }

    @Override
    public List<ReservaSalidaDTO> buscarReservasXProductoId(Long productoId) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        List<Reserva> reservas = reservaRepository.findByProducto_IdProducto(producto.getIdProducto());

        if (reservas.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron reservas para el producto con ID: " + productoId);
        }

        List<ReservaSalidaDTO> reservasSalidaDTO = reservas.stream()
                .map(reserva -> modelMapper.map(reserva, ReservaSalidaDTO.class))
                .toList();

        LOGGER.info("Reservas encontradas para el producto {}: {}", productoId, JsonPrinter.toString(reservasSalidaDTO));
        return reservasSalidaDTO;
    }

    @Override
    public void eliminarReserva(Long idReserva) {
        Reserva reserva = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada con ID: " + idReserva));
        reservaRepository.delete(reserva);
        LOGGER.info("Reserva con ID {} eliminada correctamente", idReserva);
    }

    @Override
    public ReservaSalidaDTO actualizarReserva(ReservaEntradaDTO reservaEntradaDTO, Long idReserva) {
        Reserva reservaExistente = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new EntityNotFoundException("Reserva no encontrada con ID: " + idReserva));

        Producto producto = productoRepository.findById(reservaEntradaDTO.getProductoId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + reservaEntradaDTO.getProductoId()));

        Usuario usuario = usuarioRepository.findById(reservaEntradaDTO.getUsuarioId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + reservaEntradaDTO.getUsuarioId()));

        reservaExistente.setFechaInicio(reservaEntradaDTO.getFechaInicio());
        reservaExistente.setFechaFin(reservaEntradaDTO.getFechaFin());
        reservaExistente.setProducto(producto);
        reservaExistente.setUsuario(usuario);

        Reserva reservaActualizada = reservaRepository.save(reservaExistente);
        ReservaSalidaDTO reservaSalidaDTO = modelMapper.map(reservaActualizada, ReservaSalidaDTO.class);

        LOGGER.info("Reserva actualizada: {}", JsonPrinter.toString(reservaSalidaDTO));
        return reservaSalidaDTO;
    }

    private void configureMapping() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        /*modelMapper.typeMap(ReservaEntradaDTO.class, Reserva.class)
                .addMappings(mapper -> {
                    mapper.skip(Reserva::setIdReserva); // Ignorar setIdReserva
                    mapper.skip(Reserva::setProducto);
                    mapper.skip(Reserva::setUsuario);
                    mapper.map(ReservaEntradaDTO::getFechaInicio, Reserva::setFechaInicio);
                    mapper.map(ReservaEntradaDTO::getFechaFin, Reserva::setFechaFin);
                });*/

        modelMapper.typeMap(Reserva.class, ReservaSalidaDTO.class)
                .addMappings(mapper -> mapper.map(source -> source.getProducto().getIdProducto(), ReservaSalidaDTO::setProductoId))
                .addMappings(mapper -> mapper.map(source -> source.getUsuario().getIdUsuario(), ReservaSalidaDTO::setUsuarioId))
                .addMappings(mapper -> mapper.map(Reserva::getFechaInicio, ReservaSalidaDTO::setFechaInicio))
                .addMappings(mapper -> mapper.map(Reserva::getFechaFin, ReservaSalidaDTO::setFechaFin));
    }
}
