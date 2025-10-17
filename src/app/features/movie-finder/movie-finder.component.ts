import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core'; 
@Component({
  selector: 'app-movie-finder',
  templateUrl: './movie-finder.component.html',
  styleUrls: ['./movie-finder.component.css']
})


export class MovieFinderComponent  {

  movies: any[] = [];
  isLoading: boolean = false;
  
  currentPage: number = 1;
  totalPages: number = 0;
  
  private currentFilters: any = {};

  constructor(private apiService: ApiService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.fetchMovies();
    });
  }
  onFilterChange(filters: any): void {
    this.currentFilters = filters;
    this.currentPage = 1; 
    this.fetchMovies();
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.fetchMovies();
    }
  }

  fetchMovies(): void {
    this.isLoading = true;
    this.movies = [];

    const handleResponse = (response: any) => {
      this.movies = response.results;
      this.totalPages = response.total_pages;
    };

    if (this.currentFilters.query) {
      this.apiService.searchMovies(this.currentFilters.query, this.currentPage) 
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(handleResponse);
    } else {
      const apiFilters: any = {
        'vote_average.gte': this.currentFilters.rating || 0,
      };

      if (this.currentFilters.year) apiFilters.primary_release_year = this.currentFilters.year;
      if (this.currentFilters.genre) apiFilters.with_genres = this.currentFilters.genre;
      
      this.apiService.discoverMovies(apiFilters, this.currentPage) 
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(handleResponse);
    }
  }
}