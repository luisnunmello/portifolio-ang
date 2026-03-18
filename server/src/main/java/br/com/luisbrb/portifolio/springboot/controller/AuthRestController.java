package br.com.luisbrb.portifolio.springboot.controller;

import java.util.List;
import java.util.UUID;

import br.com.luisbrb.portifolio.springboot.dto.AuthBodyRequestDTO;
import br.com.luisbrb.portifolio.springboot.exception.BaseControllerException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luisbrb.portifolio.springboot.service.AuthenticationService;
import br.com.luisbrb.portifolio.springboot.dao.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.dao.entities.AuthorizationEntity;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthRestController {
    private AuthenticationService authenticationService;
    private AuthorizationRepository authorizationRepository;

    @GetMapping("/check")
    public boolean check(@CookieValue(name = Constants.AUTH_COOKIE, required = false) String authCookie) {
        return authenticationService.getCurrentLogin(authCookie) != null;
    }


    @PostMapping("")
    public void auth(@CookieValue(name = Constants.AUTH_COOKIE, required = false) String _authCookie, @RequestBody AuthBodyRequestDTO loginBody, HttpServletResponse response) {
        List<AuthorizationEntity> authorizationEntities = authorizationRepository.getAuthorization();

        String authCookie = _authCookie != null ? _authCookie : UUID.randomUUID().toString();
        if (_authCookie == null) {
            response.addCookie(new Cookie(Constants.AUTH_COOKIE, authCookie));
        }

        if (authorizationEntities.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            authorizationRepository.save(new AuthorizationEntity(null, loginBody.getPassword(), uuid.toString()));
        }

        AuthorizationEntity authorizationEntity = authorizationEntities.get(0);
        if (authenticationService.getCurrentLogin(authCookie) != null) {
        }

        if (authorizationEntity.getPassword() == null) {
            authorizationEntity.setPassword(loginBody.getPassword());
            authorizationEntity.setUserCookie(authCookie);
            authorizationRepository.save(authorizationEntity);
        }

        if (!authorizationEntity.getPassword().equals(loginBody.getPassword())) {
            throw new BaseControllerException("Credenciais inválidas.", HttpStatus.UNAUTHORIZED);
        }

        authorizationEntity.setPassword(loginBody.getPassword());
        authorizationEntity.setUserCookie(authCookie);
        authorizationRepository.save(authorizationEntity);
    }

    @PostMapping("/changePass")
    public void changePass(@RequestBody AuthBodyRequestDTO loginBody) {
        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.getAuthorization();
        if (optAuthorizationEntity.isEmpty()) {
            throw new BaseControllerException("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }

        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationEntity.setPassword(loginBody.getPassword());
        authorizationRepository.save(authorizationEntity);
    }

    @PostMapping("/logout")
    public void logout() {
        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.getAuthorization();
        if (optAuthorizationEntity.isEmpty()) {
            throw new BaseControllerException("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationEntity.setUserCookie(null);
        authorizationRepository.save(authorizationEntity);
    }
}
