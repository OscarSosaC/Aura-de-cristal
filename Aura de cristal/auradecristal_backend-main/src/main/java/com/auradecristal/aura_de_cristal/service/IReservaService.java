package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.entrada.ProductoEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.entrada.ReservaEntradaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ProductoSalidaDTO;
import com.auradecristal.aura_de_cristal.dto.salida.ReservaSalidaDTO;

import java.util.List;

public interface IReservaService {

    ReservaSalidaDTO registrarReserva(ReservaEntradaDTO reservaEntradaDTO);
    public List<ReservaSalidaDTO> buscarReservasXUsuarioId(Long usuarioId);
    List<ReservaSalidaDTO> buscarReservasXProductoId(Long productoId);
    void eliminarReserva(Long idReserva);
    ReservaSalidaDTO actualizarReserva(ReservaEntradaDTO reservaEntradaDTO, Long idReserva);

}
