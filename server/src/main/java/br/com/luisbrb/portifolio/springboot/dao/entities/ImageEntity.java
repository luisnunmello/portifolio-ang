package br.com.luisbrb.portifolio.springboot.model.entities;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.luisbrb.portifolio.springboot.model.ImageTypeEnum;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Valid
public class ImageEntity implements Serializable {
    private @Id @GeneratedValue Long id;
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private @NotEmpty @Column(nullable = false, columnDefinition = "BYTEA") byte[] image;
    private @NotEmpty ImageTypeEnum type;
}
