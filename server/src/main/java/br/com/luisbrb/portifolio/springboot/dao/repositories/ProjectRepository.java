package br.com.luisbrb.portifolio.springboot.dao.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.luisbrb.portifolio.springboot.dao.entities.ProjectEntity;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    
}
