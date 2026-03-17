import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { ProjetoType } from '../../model/projetoModel';

@Injectable({
  providedIn: 'root'
})
export class ProjetoServiceService {
  constructor(private httpClient: HttpClient) { }
  
  public criarProjeto(projeto: ProjetoType) {
    return this.httpClient.post(`${enviroment.urlBackend}/project/create`, projeto, {withCredentials: true});
  }
  
  public getProjects() {
    return this.httpClient.get<ProjetoType[]>(`${enviroment.urlBackend}/project/all`, {withCredentials: true});
  }
  
  public getProject(id: number | string) {
    return this.httpClient.get<ProjetoType>(`${enviroment.urlBackend}/project?id=${id}`, {withCredentials: true});
  }

   public editProject(project: ProjetoType) {
    return this.httpClient.put<ProjetoType>(`${enviroment.urlBackend}/project/edit`, project, {withCredentials: true});
  }

  public removeProject(id: number | string) {
    return this.httpClient.delete<ProjetoType>(`${enviroment.urlBackend}/project/remove?id=${id}`, {withCredentials: true});
  }
}
