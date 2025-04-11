package br.com.luisbrb.portifolio.springboot.controller.filters;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.luisbrb.portifolio.springboot.controller.AuthenticationUtils;
import br.com.luisbrb.portifolio.springboot.dao.repositories.AuthorizationRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.model.entities.AuthorizationEntity;
import jakarta.annotation.Nullable;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter implements Filter {
    @Configuration
    public static class AuthenticationFilterConfiguration {
        @Bean
        public FilterRegistrationBean<AuthenticationFilter> loggingFilter(AuthorizationRepository authorizationRepository) {
            FilterRegistrationBean<AuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
            registrationBean.setFilter(new AuthenticationFilter());
            registrationBean.addUrlPatterns("/api/auth/changePass", "/api/auth/logout", "/api/image/create", "/api/project/create", "/api/project/edit", "/api/skill/create", "/api/skill/edit"); // Apply filter to API routes
            return registrationBean;
        }
    }

    @Override
    public void doFilter(ServletRequest _request, ServletResponse _response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) _request;
        HttpServletResponse response = (HttpServletResponse) _response;
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return;
        }

        @Nullable String authCookie = null; 
        for (Cookie cookie: cookies) {
            if (cookie.getName().equals(Constants.AUTH_COOKIE)) {
                authCookie = cookie.getValue();
                break;
            }
        }

        if (!AuthenticationUtils.isLoggedIn(authCookie)) {
            response.setStatus(401);
            response.getWriter().write("Você precisa estar autenticado para utilizar essa funcionalidade!");
            return;
        }

        chain.doFilter(request, response);
    }

    
    
}
