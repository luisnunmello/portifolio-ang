import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { ImageType } from '../../model/imageModel';
import { SkillType } from '../../model/skillModel';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) {}

  public getSkills() {
    return this.httpClient.get<SkillType[]>(`${enviroment.urlBackend}/skill/all`, {withCredentials: true});
  }

  public getSkill(id: number | string) {
    return this.httpClient.get<SkillType>(`${enviroment.urlBackend}/skill/get?id=${id}`, {withCredentials: true});
  }

  public saveSkill(skill: SkillType) {
    return this.httpClient.post<SkillType>(`${enviroment.urlBackend}/skill/create`, skill, {withCredentials: true});
  }

  public editSkill(skill: SkillType) {
    return this.httpClient.put<SkillType>(`${enviroment.urlBackend}/skill/edit`, skill, {withCredentials: true});
  }

  public removeSkill(id: number | string) {
    return this.httpClient.delete(`${enviroment.urlBackend}/skill/remove?id=${id}`, {withCredentials: true});
  }
}
