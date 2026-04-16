import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaItem, MediaItemUpsert } from './media-item.model';

@Injectable({ providedIn: 'root' })
export class MediaItemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5012/api/mediaitem';

  getAll() {
    return this.http.get<MediaItem[]>(this.baseUrl);
  }

  create(payload: Omit<MediaItemUpsert, 'id'>) {
    return this.http.post<MediaItem>(this.baseUrl, payload);
  }

  update(id: string, payload: MediaItemUpsert) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
