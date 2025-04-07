import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageType } from '../../../model/imageModel';
import { enviroment } from '../../../../environment';
import { ImageServiceService } from '../../../service/image/image-service.service';
import { SkillService } from '../../../service/skill/skill-service.service';
import { SkillCategory, SkillType, TechnologyTypeEnum } from '../../../model/skillModel';

@Component({
  selector: 'app-criar-habilidade',
  imports: [],
  templateUrl: './criar-habilidade.component.html',
  styleUrl: './criar-habilidade.component.scss'
})
export class CriarHabilidadeComponent {
    image?: {file: File, blob: string};
    urlImagens = `${enviroment.urlBackend}/image?id=`;

    @ViewChild("nameInput") nameInput!: ElementRef<HTMLInputElement>;
    @ViewChild("categorySelect") categorySelect!: ElementRef<HTMLInputElement>;
    @ViewChild("typeSelect") typeSelect!: ElementRef<HTMLInputElement>;
    @ViewChild("imageInput") imageInput!: ElementRef<HTMLInputElement>;

    constructor(private imageService: ImageServiceService, private skillService: SkillService) {
      
    }
    
    onChangeImages(event: Event) {
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
      this.imageService.saveImages([this.image]).subscribe((imageResult) => {
        this.skillService.saveSkill({
          name: this.nameInput.nativeElement.value,
          category: this.categorySelect.nativeElement.value as SkillCategory,
          image: imageResult ? imageResult[0] : undefined,
          type: this.typeSelect.nativeElement.value as TechnologyTypeEnum,
        }).subscribe((res) => {
          if (res) {
            alert("Success")
          }
        });
      })
    }
}
