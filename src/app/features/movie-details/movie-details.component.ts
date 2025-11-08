import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from '../../core/services/api.service';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { StorageService } from '../../core/services/storage.service'; 

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: any = null;
  similarMovies: any[] = [];
  isLoading: boolean = true;
  trailerUrl: SafeResourceUrl | null = null; 
  isFavorite: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private router: Router, 
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      if (movieId) {
        this.loadMovieDetails(+movieId);
      }
    });

    this.translate.onLangChange.subscribe(() => {
      const movieId = this.route.snapshot.paramMap.get('id');
      if (movieId) {
        this.loadMovieDetails(+movieId);
      }
    });
  }

  loadMovieDetails(movieId: number): void {
    this.isLoading = true;
    this.movie = null;
    this.similarMovies = [];
    this.trailerUrl = null;
    window.scrollTo(0, 0);

    this.isFavorite = this.storageService.isFavorite(movieId);

    this.apiService.getMovieDetails(movieId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        this.movie = response;
        this.loadSimilarMovies(movieId);
        this.loadTrailer(movieId);
      });
  }

  loadSimilarMovies(movieId: number): void {
    this.apiService.getSimilarMovies(movieId).subscribe((response: any) => {
      this.similarMovies = response.results.slice(0, 8);
    });
  }

  loadTrailer(movieId: number): void {
    this.apiService.getMovieVideos(movieId).subscribe((response: any) => {
      const trailer = response.results.find(
        (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      if (trailer) {
        const videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation(); 
    
    if (this.isFavorite) {
      this.storageService.removeFavorite(this.movie.id);
    } else {
      this.storageService.addFavorite(this.movie);
    }
    this.isFavorite = !this.isFavorite;
  }
}