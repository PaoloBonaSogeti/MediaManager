import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaType, MediaTypeUpsert } from './media-type.model';

@Injectable({ providedIn: 'root' })
export class MediaTypeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5012/api/mediatype';

  getAll() {
    return this.http.get<MediaType[]>(this.baseUrl);
  }

  create(payload: MediaTypeUpsert) {
    return this.http.post<MediaType>(this.baseUrl, payload);
  }

  update(id: number, payload: MediaTypeUpsert) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
