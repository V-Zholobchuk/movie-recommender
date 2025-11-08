import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) { }

  private get(endpoint: string, params?: any): Observable<any> {
    
    const lang = this.translate.currentLang || this.translate.defaultLang;
    const apiLang = lang === 'uk' ? 'uk-UA' : 'en-US';

    let httpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', apiLang);

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) { 
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  discoverMovies(filters: any, page: number = 1): Observable<any> {
    const params = { ...filters, page: page.toString() };
    return this.get('discover/movie', params);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.get(`movie/${id}`);
  }

  getGenres(): Observable<any> {
    return this.get('genre/movie/list');
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    const params = { query, page: page.toString() };
    return this.get('search/movie', params);
  }

  getSimilarMovies(movieId: number): Observable<any> {
    return this.get(`movie/${movieId}/similar`);
  }

  getMovieVideos(movieId: number): Observable<any> {
    return this.get(`movie/${movieId}/videos`);
  }
}