package com.auradecristal.aura_de_cristal.repository;

import com.auradecristal.aura_de_cristal.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface IReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r FROM Reserva r WHERE r.producto.id = :productoId " +
            "AND (:fechaFin >= r.fechaInicio AND :fechaInicio <= r.fechaFin)")
    List<Reserva> findReservasActivasEnRango(@Param("productoId") Long productoId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);
    List<Reserva> findByUsuario_IdUsuario(@Param("usuarioId") Long usuarioId);
    List<Reserva> findByProducto_IdProducto(@Param("productoId") Long productoId);
    @Query("SELECT r FROM Reserva r WHERE r.producto.id = :productoId " +
            "AND r.fechaInicio <= :fechaFin " +
            "AND r.fechaFin >= :fechaInicio")
    List<Reserva> validarReservasEnRango(@Param("productoId") Long productoId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

}
