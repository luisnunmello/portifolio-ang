import { Component, signal } from '@angular/core';
import { AdminPageCardComponent } from "../../../components/admin/admin-page-card/admin-page-card.component";
import { Project } from '../../../types/project.type';
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
  projects = signal<Project[]>([]);
  imagesUrl = imagesUrl;
  constructor(projectService: ProjetoServiceService) {
    projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    })
  }
}
