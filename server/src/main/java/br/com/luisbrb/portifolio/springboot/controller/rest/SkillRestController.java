package br.com.luisbrb.portifolio.springboot.controller.rest;

import java.util.List;
import java.util.Optional;

import br.com.luisbrb.portifolio.springboot.dto.requests.RemoveSkillRequestDTO;
import org.springframework.web.bind.annotation.*;

import br.com.luisbrb.portifolio.springboot.dao.repositories.SkillRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.model.entities.SkillEntity;

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
            return null;
        }
        if (!skillRepository.existsById(skillEntity.getId())) {
            return null;
        }
        return skillRepository.save(skillEntity);
    }

    @DeleteMapping("/remove")
    public void remove(@RequestParam("id") long id) {
        skillRepository.deleteById(id);
    }
}
