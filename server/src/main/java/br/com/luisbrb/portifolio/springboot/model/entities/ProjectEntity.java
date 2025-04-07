package br.com.luisbrb.portifolio.springboot.model.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import br.com.luisbrb.portifolio.springboot.model.ProjectStatusEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
public class ProjectEntity implements Serializable {
    private @Id @GeneratedValue Long id;
    private @Column(nullable = false) String name;
    private String description;
    private String repo;
    private String website;
    private String download;
    private @NotNull @Column(nullable = false) ProjectStatusEnum status;
    private @ManyToMany(targetEntity = SkillEntity.class) List<SkillEntity> techFront = new ArrayList<>();
    private @ManyToMany(targetEntity = SkillEntity.class) List<SkillEntity> techBack = new ArrayList<>();
    private @OneToMany(targetEntity = ImageEntity.class) List<ImageEntity> images = new ArrayList<>(); 
}
