import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Project } from '../../types/project.type';
import { ProjetoServiceService } from '../../service/projeto/projeto-service.service';
import { ActivatedRoute } from '@angular/router';
import { enviroment } from '../../../environment';

@Component({
  selector: 'app-project-component',
  imports: [TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponentComponent {
  project?: Project;
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
