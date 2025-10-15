import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})

export class RecommendationsComponent implements OnChanges {
  @Input() selectedGenre: string = '';
  @Input() allMovies: any[] = [];

  recommendedMovies: any[] = [];

  ngOnChanges() {
    if (this.selectedGenre) {
      this.recommendedMovies = this.allMovies
        .filter(movie => movie.genre === this.selectedGenre)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3); 
    } else {
      this.recommendedMovies = [];
    }
  }
}

