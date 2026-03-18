import { Component, ElementRef, ViewChild } from '@angular/core';
import { enviroment } from '../../../../../environment';
import { SkillCategory, Skill, Technology } from '../../../../types/skill.type';
import { ImageServiceService } from '../../../../service/image/image-service.service';
import { SkillService } from '../../../../service/skill/skill-service.service';
import { AdminPageCardComponent } from "../../../../components/admin/admin-page-card/admin-page-card.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Image } from '../../../../types/image.type';
import { imagesUrl } from '../../../../service/constants';

@Component({
  selector: 'app-create-skill',
  imports: [AdminPageCardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-skill.component.html',
  styleUrl: './create-skill.component.css'
})
export class CreateSkillComponent {
    image?: {file: File, blob: string};
    urlImagens = `${enviroment.urlBackend}/image?id=`;

    @ViewChild("nameInput") nameInput!: ElementRef<HTMLInputElement>;
    @ViewChild("categorySelect") categorySelect!: ElementRef<HTMLInputElement>;
    @ViewChild("typeSelect") typeSelect!: ElementRef<HTMLInputElement>;
    @ViewChild("imageInput") imageInput!: ElementRef<HTMLInputElement>;

    imagesUrl = imagesUrl;
    createForm = new FormGroup({
      id: new FormControl("", {nonNullable: true}),
      name: new FormControl("", {nonNullable: true}),
      categorySelect: new FormControl(""),
      typeSelect: new FormControl(""),
      image: new FormControl<Image | undefined>(undefined)
    });

    constructor(private imageService: ImageServiceService, private skillService: SkillService, route: ActivatedRoute, private router: Router) {
      if (route.snapshot.queryParamMap.has("id")) {
        const id = route.snapshot.queryParamMap.get("id")!;
        skillService.getSkill(id).subscribe((skill) => {
          this.createForm.patchValue({id: id, name: skill.name, categorySelect: skill.category, typeSelect: skill.type, image: skill.image});
        });
      }
    }
    
    onChangeImages(event: Event) {
      this.createForm.controls.image.setValue(undefined);
      const files = (event.target as HTMLInputElement).files;
      this.image = undefined;
      if (!files || files.length < 1) {
        return;
      }
      
      this.image = {
          file: files[0],
          blob: window.URL.createObjectURL(files[0])
        };
      
    }

    clickSubmit() {
      if (!this.createForm.value.id) {
        this.createSkill();
      } else {
        this.editSkill();
      }
    }

    createSkill() {
      this.imageService.saveImages([this.image]).subscribe((imageResult) => {
      this.skillService.saveSkill({
        name: this.nameInput.nativeElement.value,
        category: this.categorySelect.nativeElement.value as SkillCategory,
        image: imageResult ? imageResult[0] : undefined,
        type: this.typeSelect.nativeElement.value as Technology,
      }).subscribe((res) => {
          if (res) {
            alert("Success")
          }
        });
      })
    }

    editSkill() {
      const formValues = this.createForm.getRawValue();
      const newSkill = {
            id: Number.parseInt(formValues.id),
            name: formValues.name,
            category: formValues.categorySelect as SkillCategory,
            image: formValues.image,
            type: formValues.typeSelect as Technology,
      } as Skill; 
      if (this.image) {
        this.imageService.saveImages([this.image]).subscribe((imageResult) => {
          newSkill.image = imageResult ? imageResult[0] : undefined;
          this.skillService.editSkill(newSkill).subscribe((res) => {
              if (res) {
                this.router.navigate(["/admin/skills"]);
              }
            });
        })
      } else {
        this.skillService.editSkill(newSkill).subscribe((res) => {
          if (res) {
            this.router.navigate(["/admin/skills"]);
          }
        });
      }
    }

    removeSkill() {
      console.log(this.createForm.value);
      if (this.createForm.value.id) {
        this.skillService.removeSkill(this.createForm.value.id).subscribe(() => {
            this.router.navigate(["/admin/skills"]);
        });
      }
    }
}
