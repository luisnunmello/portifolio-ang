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

  public saveSkill(skill: SkillType) {
    return this.httpClient.post<SkillType>(`${enviroment.urlBackend}/skill/create`, skill, {withCredentials: true});
  }


}
