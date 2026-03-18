package br.com.luisbrb.portifolio.springboot.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class BaseException extends RuntimeException {
    private String message;
    private HttpStatus code;
}
