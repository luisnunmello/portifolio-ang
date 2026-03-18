package br.com.luisbrb.portifolio.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthBodyRequestDTO {
    private String password;
}
