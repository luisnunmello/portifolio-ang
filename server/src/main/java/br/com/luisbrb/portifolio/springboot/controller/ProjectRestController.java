package br.com.luisbrb.portifolio.springboot.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import br.com.luisbrb.portifolio.springboot.dao.repositories.ProjectRepository;
import br.com.luisbrb.portifolio.springboot.dao.repositories.SkillRepository;
import br.com.luisbrb.portifolio.springboot.dao.entities.ProjectEntity;

@RestController
@RequestMapping("/api/project")
public class ProjectRestController {
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public ProjectRestController(ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    @GetMapping("/all")
    Iterable<ProjectEntity> getAll() {
        return projectRepository.findAll();
    }

    @GetMapping("/get")
    Optional<ProjectEntity> get(@RequestParam("id") Long id) {
        return this.projectRepository.findById(id);
    }

    @PutMapping("/edit")
    public ProjectEntity edit(@RequestBody ProjectEntity entity) {
        if (entity.getId() == null || !projectRepository.existsById(entity.getId())) {
            return null;
        }

        return projectRepository.save(entity);
    }

    @DeleteMapping("/remove")
    public void edit(@RequestParam("id") Long id) {
        projectRepository.deleteById(id);
    }

    @PostMapping("/create")
    public ProjectEntity save(@RequestBody ProjectEntity entity) {
        entity.setId(null);
        if (!entity.getTechBack().isEmpty()) {
            entity.getTechBack().forEach(skillTech -> {
                boolean exists = skillRepository.existsById(skillTech.getId());
                if (!exists) {
                    skillRepository.save(skillTech);
                }
            });
        }
        if (!entity.getTechBack().isEmpty()) {
            entity.getTechBack().forEach(skillTech -> {
                boolean exists = skillRepository.existsById(skillTech.getId());
                if (!exists) {
                    skillRepository.save(skillTech);
                }
            });
        }
        return projectRepository.save(entity);
        // repository.save(new ProjectEntity(null, entity.name, entity.description, entity.repo, entity.website, entity.download, null, null, null, null));
    }
}