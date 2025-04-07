import { Component, Input } from '@angular/core';
import { SkillType } from '../../model/skillModel';
import { enviroment } from '../../../environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-holder',
  imports: [TranslateModule],
  inputs: [],
  templateUrl: './skill-holder.component.html',
  styleUrl: './skill-holder.component.scss'
})
export class SkillHolderComponent {
  @Input("title")
  title?: String = undefined;
  @Input("skills")
  skills: SkillType[] = []
  urlImagens = `${enviroment.urlBackend}/image?id=`;
  
  constructor(private translate: TranslateService) {
    // this.translate.setDefaultLang("pt");
  } 

}
