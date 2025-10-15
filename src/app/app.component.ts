import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,MovieListComponent,RecommendationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'movie-recommender';
  
  selectedGenre: string = '';
  movies: any[] = [];
}

