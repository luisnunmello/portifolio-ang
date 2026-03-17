package br.com.luisbrb.portifolio.springboot.dao.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.luisbrb.portifolio.springboot.dao.entities.AuthorizationEntity;

public interface AuthorizationRepository extends JpaRepository<AuthorizationEntity, Long> {
    @Query(value="SELECT e.* FROM authorization_entity e ORDER BY e.id ASC LIMIT 1 ", nativeQuery = true)
    List<AuthorizationEntity> getAuthorization();
}
