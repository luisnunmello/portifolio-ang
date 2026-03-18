import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../types/image.type';
import { Skill } from '../../types/skill.type';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) {}

  public getSkills() {
    return this.httpClient.get<Skill[]>(`${enviroment.urlBackend}/skill/all`, {withCredentials: true});
  }

  public getSkill(id: number | string) {
    return this.httpClient.get<Skill>(`${enviroment.urlBackend}/skill/get?id=${id}`, {withCredentials: true});
  }

  public saveSkill(skill: Skill) {
    return this.httpClient.post<Skill>(`${enviroment.urlBackend}/skill/create`, skill, {withCredentials: true});
  }

  public editSkill(skill: Skill) {
    return this.httpClient.put<Skill>(`${enviroment.urlBackend}/skill/edit`, skill, {withCredentials: true});
  }

  public removeSkill(id: number | string) {
    return this.httpClient.delete(`${enviroment.urlBackend}/skill/remove?id=${id}`, {withCredentials: true});
  }
}
