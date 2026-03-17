package br.com.luisbrb.portifolio.springboot.model.entities;

import java.io.Serializable;

import br.com.luisbrb.portifolio.springboot.model.SkillCategory;
import br.com.luisbrb.portifolio.springboot.model.TechnologyTypeEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Valid
@ToString
public class SkillEntity implements Serializable {
    private @Id @GeneratedValue Long id;
    private @NotNull @Column(nullable = false) String name;
    private @ManyToOne(targetEntity = ImageEntity.class) ImageEntity image;
    private SkillCategory category;
    private TechnologyTypeEnum type;
}
