package br.com.luisbrb.portifolio.springboot.controller;

import java.util.List;

import org.springframework.stereotype.Component;

import br.com.luisbrb.portifolio.springboot.dao.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.model.entities.AuthorizationEntity;

@Component
public class AuthenticationUtils {
    private static AuthorizationRepository authorizationRepository;
    public AuthenticationUtils(AuthorizationRepository authorizationRepository) {
        AuthenticationUtils.authorizationRepository = authorizationRepository;
    }   
    public static boolean isLoggedIn(String authCookie) {
        List<AuthorizationEntity> authorizationEntity = authorizationRepository.findAll();
        if (authorizationEntity == null || authorizationEntity.isEmpty()) {
            return false;
        }

        if (authorizationEntity.get(0).getUserCookie() == authCookie) {
            return false;
        }

        return true;
    }
}
