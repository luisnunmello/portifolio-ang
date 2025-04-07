import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjetoServiceService } from '../../../service/projeto/projeto-service.service';
import { ProjetoStatus, ProjetoType } from '../../../model/projetoModel';
import { ImageServiceService } from '../../../service/image/image-service.service';
import { SkillService } from '../../../service/skill/skill-service.service';
import { SkillType } from '../../../model/skillModel';

@Component({
  selector: 'app-criar-projeto',
  imports: [],
  templateUrl: './criar-projeto.component.html',
  styleUrl: './criar-projeto.component.scss'
})
export class CriarProjetoComponent {
  @ViewChild("nameInput") inputName!: ElementRef<HTMLInputElement>;
  @ViewChild("descriptionInput") descriptionInput!: ElementRef<HTMLInputElement>;
  @ViewChild("repoInput") repoInput!: ElementRef<HTMLInputElement>;
  @ViewChild("websiteInput") websiteInput!: ElementRef<HTMLInputElement>;
  @ViewChild("downloadInput") downloadInput!: ElementRef<HTMLInputElement>;
  @ViewChild("statusSelect") statusSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild("imagesInput") imagesInput!: ElementRef<HTMLInputElement>;
  
  images: {file: File, blob: string}[] = [];
  skills: SkillType[] = [];

  usedSkills = new Set<SkillType>();

  
  constructor(private projetoService: ProjetoServiceService, private imageService: ImageServiceService, private skillService: SkillService) {
    skillService.getSkills().subscribe((skills) => {
      this.skills = skills;
    })
  }
  
  onChangeImages(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    this.images = [];
    if (!files || files.length < 1) {
      return;
    }
    
    this.images = Object.values(files).map((image) => {
      return {
        file: image,
        blob: window.URL.createObjectURL(image)
      };
    })
  }

  toggleSkill(skill: SkillType) {
    if (this.usedSkills.has(skill)) {
      this.usedSkills.delete(skill);
      return;
    }
    this.usedSkills.add(skill);
  }

  public clickSubmit() {
    this.imageService.saveImages(this.images).subscribe((images) => {
      const projeto: ProjetoType = {
        name: this.inputName.nativeElement.value,
        description: this.descriptionInput.nativeElement.value,
        download: this.downloadInput.nativeElement.value,
        repo: this.repoInput.nativeElement.value,
        website: this.websiteInput.nativeElement.value,
        techBack: [],
        techFront: [],
        images: images!,
        status: this.statusSelect.nativeElement.value as ProjetoStatus
      };

      this.usedSkills.forEach((skill) => {
        if (skill.type === "BACKEND") {
          projeto.techBack.push(skill);
        } else {
          projeto.techFront.push(skill);
        }
      }) 

      this.projetoService.criarProjeto(projeto).subscribe((res) => {
        if (res) {
          alert("Success")
        }
      });
    });
  }
}
