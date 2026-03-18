import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../types/image.type';
import { Skill } from '../../types/skill.type';
import { tap } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) {}

  public getSkills() {
    return this.httpClient.get<Skill[]>(`${environment.urlBackend}/skill/all`, {withCredentials: true});
  }

  public getSkill(id: number | string) {
    return this.httpClient.get<Skill>(`${environment.urlBackend}/skill/get?id=${id}`, {withCredentials: true});
  }

  public saveSkill(skill: Skill) {
    return this.httpClient.post<Skill>(`${environment.urlBackend}/skill/create`, skill, {withCredentials: true});
  }

  public editSkill(skill: Skill) {
    return this.httpClient.put<Skill>(`${environment.urlBackend}/skill/edit`, skill, {withCredentials: true});
  }

  public removeSkill(id: number | string) {
    return this.httpClient.delete(`${environment.urlBackend}/skill/remove?id=${id}`, {withCredentials: true});
  }
}
