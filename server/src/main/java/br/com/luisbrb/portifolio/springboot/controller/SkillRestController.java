package br.com.luisbrb.portifolio.springboot.controller;

import java.util.List;
import java.util.Optional;

import br.com.luisbrb.portifolio.springboot.exception.BaseControllerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.luisbrb.portifolio.springboot.dao.repositories.SkillRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.dao.entities.SkillEntity;

@RestController
@RequestMapping("/api/skill")
public class SkillRestController {
    private SkillRepository skillRepository;
    public SkillRestController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @PostMapping("/create")
    public SkillEntity save(@CookieValue(name = Constants.AUTH_COOKIE) String authCookie, @RequestBody SkillEntity skillEntity) {
        return skillRepository.save(skillEntity);
    }

    @GetMapping("/all")
    public List<SkillEntity> getAll() {
        return skillRepository.findAll();
    }

    @GetMapping("/get")
    public SkillEntity get(@RequestParam("id") long id) {
        Optional<SkillEntity> optSkill = skillRepository.findById(id);
        return optSkill.orElse(null);
    }

    @PutMapping("/edit")
    public SkillEntity edit(@CookieValue(name = Constants.AUTH_COOKIE) String authCookie, @RequestBody SkillEntity skillEntity) {
        if (skillEntity.getId() == null) {
            throw new BaseControllerException("ID da habilidade faltando.", HttpStatus.BAD_REQUEST);
        }
        if (!skillRepository.existsById(skillEntity.getId())) {
            throw new BaseControllerException("Habilidade com o ID inserido não existe", HttpStatus.NOT_FOUND);

        }
        return skillRepository.save(skillEntity);
    }

    @DeleteMapping("/remove")
    public void remove(@RequestParam("id") long id) {
        skillRepository.deleteById(id);
    }
}
