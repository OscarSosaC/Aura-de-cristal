package com.auradecristal.aura_de_cristal.service;

import com.auradecristal.aura_de_cristal.dto.salida.ReservaSalidaDTO;

public interface IEmailService {

    boolean enviarCorreoRegistro(String usuario, String destinatario);
    //boolean enviarCorreoRecuperacionContraseña(String usuario, String destinatario);
    boolean enviarCorreoConfirmacionReservaProducto(String usuario, String destinatario, String producto, ReservaSalidaDTO infoReserva);
}
