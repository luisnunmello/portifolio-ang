package br.com.luisbrb.portifolio.springboot.controller.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luisbrb.portifolio.springboot.dao.repositories.ContactRepository;
import br.com.luisbrb.portifolio.springboot.model.entities.ContactEntity;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactRestController {
    private ContactRepository contactRepository;

    public ContactRestController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping("")
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactEntity contact) {
        System.out.println(contact.toString());
        if (contact.getId() != null) {
            return ResponseEntity.badRequest().body("Id nao e nulo");
        }
        if ((contact.getEmail() == null || contact.getEmail().isBlank())
                && (contact.getCellphone() == null || contact.getCellphone().isBlank())) {
            return ResponseEntity.badRequest().body("Voce precisa de um email ou telefone para enviar mensagens");
        }
        return ResponseEntity.ok(contactRepository.save(contact));
    }
}
