import { Component, ElementRef, ViewChild } from '@angular/core';
import { Project, ProjectStatus } from '../../../../types/project.type';
import { Skill } from '../../../../types/skill.type';
import { ImageServiceService } from '../../../../service/image/image-service.service';
import { ProjetoServiceService } from '../../../../service/projeto/projeto-service.service';
import { SkillService } from '../../../../service/skill/skill-service.service';
import { AdminPageCardComponent } from "../../../../components/admin/admin-page-card/admin-page-card.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Image } from '../../../../types/image.type';
import { imagesUrl } from '../../../../service/constants';
import { NotificationService } from '../../../../service/notification/notification.service';


@Component({
  selector: 'app-create-project',
  imports: [AdminPageCardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  @ViewChild("nameInput") inputName!: ElementRef<HTMLInputElement>;
  @ViewChild("descriptionInput") descriptionInput!: ElementRef<HTMLInputElement>;
  @ViewChild("repoInput") repoInput!: ElementRef<HTMLInputElement>;
  @ViewChild("websiteInput") websiteInput!: ElementRef<HTMLInputElement>;
  @ViewChild("downloadInput") downloadInput!: ElementRef<HTMLInputElement>;
  @ViewChild("statusSelect") statusSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild("imagesInput") imagesInput!: ElementRef<HTMLInputElement>;
  
  images: {file: File, blob: string}[] = [];
  skills: Skill[] = [];

  usedSkills = new Set<Skill>();

  form = new FormGroup({
        id: new FormControl<number | undefined>(undefined, {nonNullable: true}),
        name: new FormControl("", {nonNullable: true}),
        description: new FormControl("", {nonNullable: true}),
        repo: new FormControl("", {nonNullable: true}),
        website: new FormControl("", {nonNullable: true}),
        download: new FormControl("", {nonNullable: true}),
        status: new FormControl(""),
        skills: new FormControl<Skill[]>([], {nonNullable: true}),
      images: new FormControl<Image[]>([], {nonNullable: true})
  });

  imagesUrl = imagesUrl;
  
  constructor(private projectService: ProjetoServiceService, private imageService: ImageServiceService, skillService: SkillService, route: ActivatedRoute, private router: Router, private notificationService: NotificationService) {
    skillService.getSkills().subscribe((skills) => {
      this.skills = skills;
      
    })

    if (route.snapshot.queryParamMap.has("id")) {
        const id = route.snapshot.queryParamMap.get("id")!;
        projectService.getProject(id).subscribe((project) => {
          this.form.patchValue({...project, images: project.images, skills: [...project.techBack, ...project.techFront]});
          // console.log(project, this.form);
        });
      }
  }
  
  onChangeImages(event: Event) {
    this.form.controls.images.setValue([]);
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

  toggleSkill(event: Event, skill: Skill) {
    const input = event.target as HTMLInputElement;

    const current = this.form.getRawValue().skills;

    if (input.checked) {
      this.form.controls.skills.setValue([...current, skill])
    } else {
      this.form.controls.skills.setValue([...current.filter((currentSkill) => currentSkill.id !== skill.id)])
    }
    console.log(this.form.value.skills);
  }

  createProject(project: Project) {
    if (this.images.length < 1) {
      this.notificationService.show({title: "Erro", description: "É necessário ao menos uma imagem para criar um projeto", isError: true});
      return;
    }

    this.imageService.saveImages(this.images).subscribe((images) => {
      project.images = images;
      

      this.projectService.criarProjeto(project).subscribe((res) => {
        if (res) {
          this.notificationService.show({title: "Projeto Criado", description: "Projeto criado com sucesso.", closeFunction: () => {
                this.gotoProjectsPage();
          }});
        }
      });
    });
  }

  editProject(project: Project) {
    if (this.images.length > 0) {
      this.imageService.saveImages(this.images).subscribe((images) => {
        project.images = images;
        

        this.projectService.editProject(project).subscribe((res) => {
          if (res) {
            this.notificationService.show({title: "Projeto Editado", description: "Projeto criado com sucesso.", closeFunction: () => {
              this.gotoProjectsPage();
            }});
          }
        });
      });
    } else {
      this.projectService.editProject(project).subscribe((res) => {
          if (res) {
            this.notificationService.show({title: "Projeto Editado", description: "Projeto criado com sucesso.", closeFunction: () => {
              this.gotoProjectsPage();
            }});
          }
      });
    }
    
  }

  public clickSubmit() {
    const formValues = this.form.getRawValue();
    const project: Project = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      download: formValues.download,
      repo: formValues.repo,
      website: formValues.website,
      techBack: [],
      techFront: [],
      images: formValues.images,
      status: this.statusSelect.nativeElement.value as ProjectStatus
    };
    formValues.skills.forEach((skill) => {
        if (skill.type === "BACKEND") {
          project.techBack.push(skill);
        } else {
          project.techFront.push(skill);
        }
    });

    if (formValues.id) {
      this.editProject(project);
    } else {
      this.createProject(project);
    }
  }

  public removeProject() {
    this.projectService.removeProject(this.form.getRawValue().id!).subscribe(() => {
      this.notificationService.show({title: "Projeto Removido", description: "Projeto removido com sucesso.", closeFunction: () => {
          this.gotoProjectsPage();  
      }});
    });
  }

   isSkillChecked(skill: Skill): boolean {
    console.log(skill, this.form.getRawValue());
    return this.form.getRawValue().skills.find((formSkill) => 
      skill.id === formSkill.id
    ) ? true : false;
  }

  gotoProjectsPage() {
    this.router.navigate(["/admin/projects"]);
  }
}
