package com.auradecristal.aura_de_cristal.service.impl;

import com.auradecristal.aura_de_cristal.dto.salida.ReservaSalidaDTO;
import com.auradecristal.aura_de_cristal.service.IEmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;

@Service
public class EmailService implements IEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public boolean enviarCorreoRegistro(String usuario, String destinatario) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);

            helper.setTo(destinatario);
            helper.setSubject("Verificación de Cuenta");
            helper.setFrom("auradecristal.alquiler@gmail.com");

            // Contenido HTML
            String contenidoHtml = String.format(
                    """
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="https://aura-de-cristal.vercel.app/assets/Logo-C2gC0Mrx.png" alt="Aura de Cristal" style="width: 150px; height: auto;">
                            </div>
                            <h2 style="color: #0056b3; text-align: center;">¡Hola, %s!</h2>
                            <p>Tu cuenta en <strong>Aura de Cristal</strong> ha sido creada exitosamente.</p>
                            <p>Para empezar a disfrutar de nuestros servicios, ingresa a nuestro sitio web:</p>
                            <div style="text-align: center; margin: 20px;">
                                <a href="https://aura-de-cristal.vercel.app" style="display: inline-block; background-color: #dba643cc; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                                    Ir al sitio!
                                </a>
                            </div>
                            <p>Si tienes alguna duda, no dudes en contactarnos.</p>
                            <p>Gracias,<br>Equipo de <strong>Aura de Cristal</strong></p>
                        </body>
                    </html>
                    """, usuario
            );

            helper.setText(contenidoHtml, true); // Activar HTML en el correo
            mailSender.send(mensaje);
            return true;

        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException("Error al enviar correo", e);
        }
    }

    @Override
    public boolean enviarCorreoConfirmacionReservaProducto(String usuario, String destinatario, String producto, ReservaSalidaDTO infoReserva) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);

            helper.setTo(destinatario);
            helper.setSubject("Confirmación de Reserva");
            helper.setFrom("auradecristal.alquiler@gmail.com");

            // Contenido HTML con detalles de la reserva
            String contenidoHtml = String.format(
                    """
                    <html>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <img src="https://aura-de-cristal.vercel.app/assets/Logo-C2gC0Mrx.png" alt="Aura de Cristal" style="width: 150px; height: auto;">
                            </div>
                            <h2 style="color: #0056b3; text-align: center;">¡Hola, %s!</h2>
                            <p>Tu reserva en <strong>Aura de Cristal</strong> ha sido creada exitosamente.</p>
                            <p><strong>Detalles de la Reserva:</strong></p>
                            <ul>
                                <li><strong>Producto:</strong> %s</li>
                                <li><strong>Fecha de Reserva:</strong> Desde: %s - Hasta: %s</li>
                            </ul>
                            <div style="text-align: center; margin: 20px;">
                                <a href="https://aura-de-cristal.vercel.app" style="display: inline-block; background-color: #dba643cc; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                                    Ver mis reservas
                                </a>
                            </div>
                            <p>Si tienes alguna duda, no dudes en contactarnos.</p>
                            <p>Gracias,<br>Equipo de <strong>Aura de Cristal</strong></p>
                        </body>
                    </html>
                    """, usuario, producto, infoReserva.getFechaInicio(), infoReserva.getFechaFin()
            );

            helper.setText(contenidoHtml, true); // Activar HTML en el correo
            mailSender.send(mensaje);
            return true;

        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException("Error al enviar correo", e);
        }
    }

}
