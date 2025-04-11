package br.com.luisbrb.portifolio.springboot.controller.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/integrations")
public class IntegrationsRestController {
    @PostMapping("/discord")
    public void setDiscordToken() {
        
    }
}
