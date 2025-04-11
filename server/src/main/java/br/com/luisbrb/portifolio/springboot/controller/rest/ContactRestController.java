package br.com.luisbrb.portifolio.springboot.controller.rest;

import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luisbrb.portifolio.springboot.controller.integrations.discord.DiscordBotComponent;
import br.com.luisbrb.portifolio.springboot.dao.repositories.ContactRepository;
import br.com.luisbrb.portifolio.springboot.model.entities.ContactEntity;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactRestController {
    private ContactRepository contactRepository;
    private DiscordBotComponent discordBot;

    public ContactRestController(ContactRepository contactRepository, DiscordBotComponent discordBot) {
        this.contactRepository = contactRepository;
        this.discordBot = discordBot;
    }

    @PostMapping("")
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactEntity contact) {
        Logger.getAnonymousLogger().info(contact.toString());
        if (contact.getId() != null) {
            return ResponseEntity.badRequest().body("Id nao e nulo");
        }

        if (contact.getName() == null || contact.getName().isBlank()) {
            return ResponseEntity.badRequest().body("Você precisa fornecer um nome para enviar contato");
        }

        if ((contact.getEmail() == null || contact.getEmail().isBlank())
                && (contact.getCellphone() == null || contact.getCellphone().isBlank())) {
            return ResponseEntity.badRequest().body("Você precisa fornecer um email ou telefone para enviar contato");
        }

        discordBot.sendContactMessageChannel(contact);

        return ResponseEntity.ok(contactRepository.save(contact));
    }
}
