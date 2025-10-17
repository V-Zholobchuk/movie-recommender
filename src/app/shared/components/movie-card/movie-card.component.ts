import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  
  @Input() movie!: any;
  @Output() favoriteChanged = new EventEmitter<void>(); 

  isFavorite: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.isFavorite = this.storageService.isFavorite(this.movie.id);
  }

  showDetails(): void {
    this.router.navigate(['/movie', this.movie.id]);
  }
  
  toggleFavorite(event: Event): void {
    event.stopPropagation();
    
    if (this.isFavorite) {
      this.storageService.removeFavorite(this.movie.id);
    } else {
      this.storageService.addFavorite(this.movie);
    }
    this.isFavorite = !this.isFavorite;
    this.favoriteChanged.emit();
  }
}