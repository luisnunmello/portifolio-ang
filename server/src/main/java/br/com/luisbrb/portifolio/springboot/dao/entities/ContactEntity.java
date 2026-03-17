package br.com.luisbrb.portifolio.springboot.model.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Valid
@ToString
public class ContactEntity implements Serializable {
    private @Id() @GeneratedValue Long id;
    private String name;
    private String email;
    private String cellphone;
    private @NotEmpty String message;

}