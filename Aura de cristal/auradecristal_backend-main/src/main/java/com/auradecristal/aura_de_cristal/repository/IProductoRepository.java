package com.auradecristal.aura_de_cristal.repository;

import com.auradecristal.aura_de_cristal.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> findByNombre(String nombre);
    @Query(value = "SELECT * FROM producto ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> findRandomProducts();
    @Query("SELECT p FROM Producto p WHERE (:descripcion IS NULL OR p.descripcion LIKE %:descripcion%) OR (:descripcion IS NULL OR p.nombre LIKE %:descripcion%)")
    List<Producto> findProductosDisponiblesSinFechas(@Param("descripcion") String descripcion);
    @Query("SELECT p FROM Producto p WHERE ((:descripcion IS NULL OR p.descripcion LIKE %:descripcion%) OR (:descripcion IS NULL OR p.nombre LIKE %:descripcion%)) AND " +
            "NOT EXISTS (SELECT r FROM Reserva r WHERE r.producto.id = p.id " +
            "AND (:fechaFin >= r.fechaInicio AND :fechaInicio <= r.fechaFin))")
    List<Producto> findProductosDisponiblesConFechas(@Param("fechaInicio") LocalDate fechaInicio,
                                                     @Param("fechaFin") LocalDate fechaFin,
                                                     @Param("descripcion") String descripcion);



}
