import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IdsModel } from '../../models/ids.model';
import { PlayListModel } from '../../models/play-list.model';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  ObtenerPlayListPorIdCategorias(idsCategorias: IdsModel[]): Observable<PlayListModel[]> {
    return this.http.post<PlayListModel[]>(`${this.baseUrl}/api/PlayList/ObtenerPlayListPorIdCategorias`, idsCategorias);
  }
}
