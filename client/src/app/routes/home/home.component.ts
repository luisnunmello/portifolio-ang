import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjetoServiceService } from '../../service/projeto/projeto-service.service';
import { Project } from '../../types/project.type';
import { ProjectCarouselComponent } from "../../components/home/project-carousel/project-carousel.component";
import { SkillCategory, Skill } from '../../types/skill.type';
import { SkillService } from '../../service/skill/skill-service.service';
import { NgFor } from '@angular/common';
import { enviroment } from '../../../environment';
import { SkillHolderComponent } from "../../components/home/skill-holder/skill-holder.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { ContactService } from '../../service/contact/contact.service';
import { NotificationService } from '../../service/notification/notification.service';
import { HeaderComponent } from '../../components/shared/header/header.component';

@Component({
  selector: 'home-root',
  imports: [RouterOutlet, TranslateModule, ProjectCarouselComponent, SkillHolderComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class AppComponent {
  title = 'portifolio';
  linkedInUrl = "https://www.linkedin.com/in/luisnunmello/";
  projects: Project[] = [];
  skills: Skill[] = [];
  skillByCategory: {[key in SkillCategory]: Skill[]} = {DATABASE: [], FRAMEWORK: [], LANGUAGE: [], OPERATIONAL_SYSTEM: [], VERSIONING: []};

  dateStart = new Date("12/4/2021");

  urlImagens = `${enviroment.urlBackend}/image?id=`;

  currentProject?: Project = undefined; 

  isMobile = false;

  isIndentificationMessageValid?: boolean = undefined;
  isNameTyped?: boolean = undefined;

  messageSubmitForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    cellphone: new FormControl(""),
    message: new FormControl("")
  });

  @ViewChild("backgroundFillerText") backgroundFillerText!: ElementRef<HTMLParagraphElement>;
  
  constructor(private translate: TranslateService, private projetoService: ProjetoServiceService, private skillService: SkillService, private contactService: ContactService, private notificationService: NotificationService) {
    // this.translate.setDefaultLang("pt");
    this.isMobile = this.checkIsMobile();
    this.projetoService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.currentProject = this.projects[0];
    });
    this.skillService.getSkills().subscribe((skills) => {
      this.skills = skills;
      this.sortSkillsByCategory(skills);
    })

    // notificationService.show({title: "Teste", description: "Teste zao teste testes jfaifjwafowejf", status: 401})
  }

  public onSubmitMessage() {  
    const isNameTyped = this.checkIsNameTyped();
    const isIndentificationMessageValid = this.checkIsIndentificationValid();
    if (!isNameTyped || !isIndentificationMessageValid) {
      return;
    }

    this.contactService.submitMessage({id: null, message: this.messageSubmitForm.value.message!, email: this.messageSubmitForm.value.email!, cellphone: this.messageSubmitForm.value.cellphone!, name: this.messageSubmitForm.value.name!}).subscribe((res) => {
      if (res.status !== 200) {
        if (typeof res.body === "string") {
          this.notificationService.show({title: "Erro", description: res.body, status: res.status});
        } else {
          this.notificationService.show({title: "Erro", description: `Erro desconhecido ${res.body}`, status: res.status});
        }
        return;
      }
      this.notificationService.show({title: "Sucesso", description: "Contato enviado :)", status: res.status});
    })
  }

  public checkIsNameTyped() {
    if (!this.messageSubmitForm.value.name || this.messageSubmitForm.value.name.trim() === "") {
      this.isNameTyped = false;
    } else {
      this.isNameTyped = true;
    }
    return this.isNameTyped;
  }

  public checkIsIndentificationValid() {
    if (!this.messageSubmitForm.value.cellphone && !this.messageSubmitForm.value.email) {
      this.isIndentificationMessageValid = false;
    } else {
      this.isIndentificationMessageValid = true;
    }
    return this.isIndentificationMessageValid;
  }

  public checkIsMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  public updateProject(iProject: number) {
    this.currentProject = this.projects[iProject];
  }

  public sortSkillsByCategory(skills: Skill[]) {
    skills.forEach((skill) => {
      this.skillByCategory[skill.category].push(skill);
    }) 
  }

}
