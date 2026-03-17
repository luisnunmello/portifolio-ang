package br.com.luisbrb.portifolio.springboot.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.luisbrb.portifolio.springboot.dao.entities.ContactEntity;

public interface ContactRepository extends JpaRepository<ContactEntity, Long> {

}
