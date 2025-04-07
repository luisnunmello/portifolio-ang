import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { ImageType } from '../../model/imageModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) {}

  public saveImages(images:({file: File, blob: string} | undefined)[]) {
    return new Observable<ImageType[] | undefined>((subscriber) => {
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
      this.httpClient.post<ImageType[]>(`${enviroment.urlBackend}/image`, formData, {withCredentials: true}).subscribe((res) => {
        subscriber.next(res);
      });
    })
    
  }


}
