package br.com.luisbrb.portifolio.springboot.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3010", "https://angular.luisbrb.com.br/", "https://luisbrb.com.br/", "http://192.168.0.195:3010/", "https://luisnmello.com.br/")
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

}