import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../types/image.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) {}

  public saveImages(images:({file: File, blob: string} | undefined)[]) {
    return new Observable<Image[] | undefined>((subscriber) => {
      const formData = new FormData();
      let imgCount = 0;
      images.forEach((image) => {
        if (!image) {
          return;
        }
        imgCount ++;
        formData.append("image", image.file);
      });
      if (imgCount < 1) {
        subscriber.next(undefined);
        return;
      }
      this.httpClient.post<Image[]>(`${environment.urlBackend}/image/create`, formData, {withCredentials: true}).subscribe((res) => {
        subscriber.next(res);
      });
    })
    
  }


}
