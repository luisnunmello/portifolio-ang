package br.com.luisbrb.portifolio.springboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
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
        List<AuthorizationEntity> authorizationEntities = authorizationRepository.getAuthorization();
        if (authorizationEntities == null || authorizationEntities.isEmpty()) {
            return false;
        }

        AuthorizationEntity authorizationEntity = authorizationEntities.get(0);
        if (authorizationEntity.getUserCookie() == null || !authorizationEntity.getUserCookie().equals(authCookie)) {
            return false;
        }

        return true;
    }
}
