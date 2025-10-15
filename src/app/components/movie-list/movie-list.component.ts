import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  genres: string[] = [];
  selectedGenre: string = 'Усі';

  @Output() genreSelected = new EventEmitter<string>(); 
  @Output() moviesLoaded = new EventEmitter<any[]>();   

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('../../assets/data/movies.json').subscribe(data => {
      this.movies = data;
      this.filteredMovies = data;
      this.genres = ['Усі', ...new Set(data.map(movie => movie.genre))];

      this.moviesLoaded.emit(this.movies);
    });
  }

  filterByGenre() {
    if (this.selectedGenre === 'Усі') {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.movies.filter(
        movie => movie.genre === this.selectedGenre
      );
    }

    this.genreSelected.emit(this.selectedGenre);
  }
}
