package br.com.luisbrb.portifolio.springboot.dao.repositories;
import org.springframework.data.repository.CrudRepository;

import br.com.luisbrb.portifolio.springboot.model.entities.ProjectEntity;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    
}
