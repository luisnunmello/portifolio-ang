package br.com.luisbrb.portifolio.springboot.controller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.luisbrb.portifolio.springboot.model.entities.SkillEntity;

public interface SkillRepository extends JpaRepository<SkillEntity, Long> {
    
}
