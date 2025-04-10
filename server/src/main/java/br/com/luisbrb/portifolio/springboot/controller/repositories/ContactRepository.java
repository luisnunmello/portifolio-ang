package br.com.luisbrb.portifolio.springboot.controller.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.luisbrb.portifolio.springboot.model.entities.ContactEntity;

public interface ContactRepository extends JpaRepository<ContactEntity, Long> {

}
