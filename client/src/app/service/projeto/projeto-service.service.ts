import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Project } from '../../types/project.type';

@Injectable({
  providedIn: 'root'
})
export class ProjetoServiceService {
  constructor(private httpClient: HttpClient) { }
  
  public criarProjeto(projeto: Project) {
    return this.httpClient.post(`${environment.urlBackend}/project/create`, projeto, {withCredentials: true});
  }
  
  public getProjects() {
    return this.httpClient.get<Project[]>(`${environment.urlBackend}/project/all`, {withCredentials: true});
  }
  
  public getProject(id: number | string) {
    return this.httpClient.get<Project>(`${environment.urlBackend}/project/get?id=${id}`, {withCredentials: true});
  }

   public editProject(project: Project) {
    return this.httpClient.put<Project>(`${environment.urlBackend}/project/edit`, project, {withCredentials: true});
  }

  public removeProject(id: number | string) {
    return this.httpClient.delete<Project>(`${environment.urlBackend}/project/remove?id=${id}`, {withCredentials: true});
  }
}
