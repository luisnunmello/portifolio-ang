import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjetoType } from '../../model/projetoModel';
import { ProjetoServiceService } from '../../service/projeto/projeto-service.service';
import { ActivatedRoute } from '@angular/router';
import { enviroment } from '../../../environment';

@Component({
  selector: 'app-project-component',
  imports: [TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponentComponent {
  project?: ProjetoType;
  urlImagens = `${enviroment.urlBackend}/image?id=`;
  
  constructor(private translateService: TranslateService, private projectService: ProjetoServiceService, private route: ActivatedRoute) {
    // this.translateService.setDefaultLang("pt");
    const id = route.snapshot.paramMap.get("id");
    if (!id) {
      return;
    }
    this.projectService.getProject(Number.parseInt(id)).subscribe((project) => {
      this.project = project;
    });
  }
}
