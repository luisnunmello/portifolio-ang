package br.com.luisbrb.portifolio.springboot.controller.rest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luisbrb.portifolio.springboot.controller.AuthenticationUtils;
import br.com.luisbrb.portifolio.springboot.controller.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.model.entities.AuthorizationEntity;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {
    private AuthorizationRepository authorizationRepository;

    public AuthRestController(AuthorizationRepository authorizationEntity) {
        this.authorizationRepository = authorizationEntity;
    }

    @GetMapping("/check")
    public boolean check(@CookieValue(name = Constants.AUTH_COOKIE, required = false) String authCookie) {
        return AuthenticationUtils.isLoggedIn(authCookie);
    }

    public static class LoginBody {
        public String password;
    }

    @PostMapping("")
    public boolean auth(@CookieValue(name = Constants.AUTH_COOKIE, required = false) String authCookie, @RequestBody LoginBody loginBody, HttpServletResponse response) {
        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.findAll();
        if (optAuthorizationEntity.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            response.addCookie(new Cookie(Constants.AUTH_COOKIE, uuid.toString()));
            authorizationRepository.save(new AuthorizationEntity(null, loginBody.password, uuid.toString()));
            return true;
        }

        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        if (authorizationEntity.getPassword() == null) {
            authorizationEntity.setPassword(loginBody.password);
            authorizationRepository.save(authorizationEntity);
            return true;
        }

        if (authorizationEntity.getPassword().equals(loginBody.password)) {
            return false;
        }

        authorizationEntity.setUserCookie(authCookie);
        authorizationRepository.save(authorizationEntity);

        return true;
    }

    @PostMapping("/changePass")
    public boolean changePass(@CookieValue("auth-id") String authCookie, @RequestBody LoginBody loginBody) {
        if (!AuthenticationUtils.isLoggedIn(authCookie)) {
            return false;
        };

        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.findAll();
        if (optAuthorizationEntity.isEmpty()) {
            return false;
        }

        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationEntity.setPassword(loginBody.password);
        return true;
    }

    @PostMapping("/logout")
    public boolean logout(@CookieValue("auth-id") String authCookie) {
        if (!AuthenticationUtils.isLoggedIn(authCookie)) {
            return false;
        };

        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.findAll();
        if (optAuthorizationEntity.isEmpty()) {
            return false;
        }
        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationRepository.delete(authorizationEntity);
        return true;
    }
}
