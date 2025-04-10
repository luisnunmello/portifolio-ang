package br.com.luisbrb.portifolio.springboot.controller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.luisbrb.portifolio.springboot.model.entities.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    
}
