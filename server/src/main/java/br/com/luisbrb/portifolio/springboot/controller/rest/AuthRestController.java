package br.com.luisbrb.portifolio.springboot.controller.rest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.luisbrb.portifolio.springboot.controller.AuthenticationUtils;
import br.com.luisbrb.portifolio.springboot.dao.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.model.entities.AuthorizationEntity;
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
    public boolean auth(@CookieValue(name = Constants.AUTH_COOKIE, required = false) String _authCookie, @RequestBody LoginBody loginBody, HttpServletResponse response) {
        List<AuthorizationEntity> authorizationEntities = authorizationRepository.getAuthorization();

        String authCookie = _authCookie != null ? _authCookie : UUID.randomUUID().toString();
        if (_authCookie == null) {
            response.addCookie(new Cookie(Constants.AUTH_COOKIE, authCookie));
        }

        if (authorizationEntities.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            authorizationRepository.save(new AuthorizationEntity(null, loginBody.password, uuid.toString()));
            return true;
        }

        AuthorizationEntity authorizationEntity = authorizationEntities.get(0);
        if (AuthenticationUtils.isLoggedIn(authCookie)) {
            return true;
        }

        if (authorizationEntity.getPassword() == null) {
            authorizationEntity.setPassword(loginBody.password);
            authorizationEntity.setUserCookie(authCookie);
            authorizationRepository.save(authorizationEntity);
            return true;
        }

        if (!authorizationEntity.getPassword().equals(loginBody.password)) {
            return false;
        }

        authorizationEntity.setPassword(loginBody.password);
        authorizationEntity.setUserCookie(authCookie);
        authorizationRepository.save(authorizationEntity);
        return true;
    }

    @PostMapping("/changePass")
    public boolean changePass(@RequestBody LoginBody loginBody) {
        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.findAll();
        if (optAuthorizationEntity.isEmpty()) {
            return false;
        }

        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationEntity.setPassword(loginBody.password);
        return true;
    }

    @PostMapping("/logout")
    public boolean logout() {
        List<AuthorizationEntity> optAuthorizationEntity = authorizationRepository.findAll();
        if (optAuthorizationEntity.isEmpty()) {
            return false;
        }
        AuthorizationEntity authorizationEntity = optAuthorizationEntity.get(0);
        authorizationEntity.setUserCookie(null);
        authorizationRepository.save(authorizationEntity);
        return true;
    }
}
