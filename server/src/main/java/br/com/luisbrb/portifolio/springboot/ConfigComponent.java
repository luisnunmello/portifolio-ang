package br.com.luisbrb.portifolio.springboot;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import br.com.luisbrb.portifolio.springboot.controller.LoggerComponent;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.Getter;

@Component
public class ConfigComponent {
    private File file;
    @Getter private Properties properties = new Properties();
    @Getter private Properties originalProperties = new Properties();
    private LoggerComponent logger;

    public ConfigComponent(LoggerComponent loggerComponent) {
        this.logger = loggerComponent;
    }

    @PostConstruct
    public void loadProperties() throws IOException {
        logger.info("Loading properties");
        file = ResourceUtils.getFile("classpath:config.properties");
        InputStream in = new FileInputStream(file);
        properties.load(in);
        originalProperties.load(in);
    }

    @PreDestroy
    public void saveProperties() throws IOException {
        if (!properties.equals(originalProperties)) {
            logger.info("No changes in properties, ignoring save.");
            return;
        }
        logger.info("Saving properties");
        properties.store(new FileOutputStream(file), null);
    }

    public void setProperty(String key, String value) {
        properties.setProperty(key, value);
    }

    public String getProperty(String key) {
        return properties.getProperty(key);
    }
}