import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { TranslateService } from '@ngx-translate/core'; 
@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.css']
})
export class MovieFiltersComponent implements OnInit {

  genres: any[] = [];
  
  selectedGenre: string = '';
  selectedYear: string = ''; 
  selectedRating: number = 6; 
  searchQuery: string = '';

  @Output() filterChange = new EventEmitter<any>();

  constructor(private apiService: ApiService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadGenres();
    this.applyFilters(); 

    this.translate.onLangChange.subscribe(() => {
      this.loadGenres();})
  }

  loadGenres(): void {
    this.apiService.getGenres().subscribe((response: any) => {
      this.genres = response.genres;
    });
  }

  applyFilters(): void {
    const filters = {
      genre: this.selectedGenre,
      year: this.selectedYear,
      rating: this.selectedRating,
      query: this.searchQuery
    };
    this.filterChange.emit(filters);
  }
}