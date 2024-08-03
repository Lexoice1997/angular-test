import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { API_KEY } from '../../../environments/environment.prod';
import { Pagination } from '../../shared/models/pagination';
import { SearchModel } from '../models/searchModel';
import { VideoModel } from '../models/videoModel';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly SEARCH_URL = 'search';
  private readonly VIDEOS_URL = 'videos';
  public results = signal<SearchModel[]>([]);

  constructor(private http: HttpClient) {}

  public searchFn(
    value: string,
    sortBy: string | boolean
  ): Observable<Pagination<SearchModel>> {
    let params = new HttpParams()
      .set('q', value)
      .set('key', API_KEY)
      .set('part', 'snippet')
      .set('maxResults', 20)
      .set('type', 'video');

    if (sortBy) {
      params = params.set('order', sortBy);
    }

    return this.http.get<Pagination<SearchModel>>(this.SEARCH_URL, { params });
  }

  public statisticsFn(ids: string[]) {
    const params = new HttpParams()
      .set('id', ids.join(','))
      .set('key', API_KEY)
      .set('maxResults', 20)
      .set('part', 'snippet,statistics');

    return this.http.get<Pagination<VideoModel>>(this.VIDEOS_URL, { params });
  }

  public getOneVideo(id: string) {
    const params = new HttpParams()
      .set('id', id)
      .set('key', API_KEY)
      .set('part', 'snippet,statistics');

    return this.http.get<Pagination<VideoModel>>(this.VIDEOS_URL, { params });
  }
}
