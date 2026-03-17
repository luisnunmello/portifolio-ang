import { Component, signal } from '@angular/core';
import { AdminPageCardComponent } from "../../../components/admin-page-card/admin-page-card.component";
import { ProjetoType } from '../../../model/projetoModel';
import { ProjetoServiceService } from '../../../service/projeto/projeto-service.service';
import { imagesUrl } from '../../../service/constants';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-projects',
  imports: [AdminPageCardComponent, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = signal<ProjetoType[]>([]);
  imagesUrl = imagesUrl;
  constructor(projectService: ProjetoServiceService) {
    projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    })
  }
}
