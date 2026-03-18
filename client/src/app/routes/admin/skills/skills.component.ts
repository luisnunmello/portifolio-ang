import { Component, signal } from '@angular/core';
import { AdminPageCardComponent } from "../../../components/admin/admin-page-card/admin-page-card.component";
import { SkillService } from '../../../service/skill/skill-service.service';
import { Skill } from '../../../types/skill.type';
import { imagesUrl } from '../../../service/constants';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-skills',
  imports: [AdminPageCardComponent, RouterLink],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skills = signal<Skill[] | undefined>(undefined);
  imagesUrl = imagesUrl;
  constructor(skillService: SkillService) {
    skillService.getSkills().subscribe((val) => {
      this.skills.set(val);
    })
  }
}
