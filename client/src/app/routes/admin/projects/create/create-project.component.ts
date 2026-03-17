import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProjetoType, ProjetoStatus } from '../../../../model/projetoModel';
import { SkillType } from '../../../../model/skillModel';
import { ImageServiceService } from '../../../../service/image/image-service.service';
import { ProjetoServiceService } from '../../../../service/projeto/projeto-service.service';
import { SkillService } from '../../../../service/skill/skill-service.service';
import { AdminPageCardComponent } from "../../../../components/admin-page-card/admin-page-card.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageType } from '../../../../model/imageModel';
import { imagesUrl } from '../../../../service/constants';


@Component({
  selector: 'app-create-project',
  imports: [AdminPageCardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
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
  skills: SkillType[] = [];

  usedSkills = new Set<SkillType>();

  form = new FormGroup({
        id: new FormControl<number | undefined>(undefined, {nonNullable: true}),
        name: new FormControl("", {nonNullable: true}),
        description: new FormControl("", {nonNullable: true}),
        repo: new FormControl("", {nonNullable: true}),
        website: new FormControl("", {nonNullable: true}),
        download: new FormControl("", {nonNullable: true}),
        status: new FormControl(""),
        skills: new FormControl<SkillType[]>([], {nonNullable: true}),
      images: new FormControl<ImageType[]>([], {nonNullable: true})
  });

  imagesUrl = imagesUrl;
  
  constructor(private projectService: ProjetoServiceService, private imageService: ImageServiceService, skillService: SkillService, route: ActivatedRoute, private router: Router) {
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

  toggleSkill(event: Event, skill: SkillType) {
    const input = event.target as HTMLInputElement;

    const current = this.form.getRawValue().skills;

    if (input.checked) {
      this.form.controls.skills.setValue([...current, skill])
    } else {
      this.form.controls.skills.setValue([...current.filter((currentSkill) => currentSkill.id !== skill.id)])
    }
    console.log(this.form.value.skills);
  }

  createProject(project: ProjetoType) {
    if (this.images.length < 1) {
      alert("Project should have at least one image");
      return;
    }

    this.imageService.saveImages(this.images).subscribe((images) => {
      project.images = images;
      

      this.projectService.criarProjeto(project).subscribe((res) => {
        if (res) {
          this.router.navigate(["/admin/projects"])
        }
      });
    });
  }

  editProject(project: ProjetoType) {
    if (this.images.length > 0) {
      this.imageService.saveImages(this.images).subscribe((images) => {
        project.images = images;
        

        this.projectService.editProject(project).subscribe((res) => {
          if (res) {
            this.router.navigate(["/admin/projects"])
          }
        });
      });
    } else {
      this.projectService.editProject(project).subscribe((res) => {
          if (res) {
            this.router.navigate(["/admin/projects"])
          }
      });
    }
    
  }

  public clickSubmit() {
    const formValues = this.form.getRawValue();
    const project: ProjetoType = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      download: formValues.download,
      repo: formValues.repo,
      website: formValues.website,
      techBack: [],
      techFront: [],
      images: formValues.images,
      status: this.statusSelect.nativeElement.value as ProjetoStatus
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
      this.router.navigate(["/admin/projects"])
    });
  }

   isSkillChecked(skill: SkillType): boolean {
    console.log(skill, this.form.getRawValue());
    return this.form.getRawValue().skills.find((formSkill) => 
      skill.id === formSkill.id
    ) ? true : false;
  }
}
