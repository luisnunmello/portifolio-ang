package br.com.luisbrb.portifolio.springboot.service;

import java.util.logging.Logger;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {
    private Logger logger;
    public LoggerService() {
        logger = Logger.getLogger("portifolio.backend", null);
    }

    public void info(String message) {
        logger.info(message);
    }
    public void warn(String message) {
        logger.warning(message);
    }
}
