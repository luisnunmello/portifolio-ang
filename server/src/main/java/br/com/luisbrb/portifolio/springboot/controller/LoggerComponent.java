package br.com.luisbrb.portifolio.springboot.controller;

import java.util.logging.Logger;

import org.springframework.stereotype.Component;

@Component
public class LoggerComponent {
    private Logger logger;
    public LoggerComponent() {
        logger = Logger.getLogger("portifolio.backend", null);
    }

    public void info(String message) {
        logger.info(message);
    }
    public void warn(String message) {
        logger.warning(message);
    }
}
