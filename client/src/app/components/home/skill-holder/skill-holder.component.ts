import { Component, Input } from '@angular/core';
import { Skill } from '../../../types/skill.type';
import { enviroment } from '../../../../environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { imagesUrl } from '../../../service/constants';

@Component({
  selector: 'app-skill-holder',
  imports: [TranslateModule],
  inputs: [],
  templateUrl: './skill-holder.component.html',
  styleUrl: './skill-holder.component.css'
})
export class SkillHolderComponent {
  @Input("title")
  title?: String = undefined;
  @Input("skills")
  skills: Skill[] = []
  imagesUrl =  imagesUrl
  
  constructor() {} 

}
