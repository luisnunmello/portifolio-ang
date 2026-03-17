package br.com.luisbrb.portifolio.springboot.controller;

import java.util.List;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import br.com.luisbrb.portifolio.springboot.dao.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.dao.entities.AuthorizationEntity;

@Component
@AllArgsConstructor
public class AuthenticationService {
    private AuthorizationRepository authorizationRepository;

    public AuthorizationEntity getCurrentLogin(String authCookie) {
        List<AuthorizationEntity> authorizationEntities = authorizationRepository.getAuthorization();
        if (authorizationEntities == null || authorizationEntities.isEmpty()) {
            throw new RuntimeException("User Not Found");
        }

        AuthorizationEntity authorizationEntity = authorizationEntities.get(0);
        if (authorizationEntity.getUserCookie() == null || !authorizationEntity.getUserCookie().equals(authCookie)) {
            return null;
        }

        return authorizationEntity;
    }
}
