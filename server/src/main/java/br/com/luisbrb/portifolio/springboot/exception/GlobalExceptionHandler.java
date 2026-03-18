package br.com.luisbrb.portifolio.springboot.exception;

import br.com.luisbrb.portifolio.springboot.dto.ExceptionResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BaseControllerException.class)
    public ResponseEntity<ExceptionResponseDTO> handleUnauthorized(BaseControllerException exception) {
        return ResponseEntity.status(exception.getStatus()).body(
                new ExceptionResponseDTO(
                        exception.getStatus().getReasonPhrase(),
                        exception.getMessage(),
                        exception.getStatus().value()
                )
        );
    }
}
