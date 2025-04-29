package com.auradecristal.aura_de_cristal.repository;

import com.auradecristal.aura_de_cristal.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria, Long> {

}
