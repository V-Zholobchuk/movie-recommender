import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly FAVORITES_KEY = 'favoriteMovies';

  getFavorites(): any[] {
    const favoritesJson = localStorage.getItem(this.FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === movieId);
  }

  addFavorite(movie: any): void {
    const favorites = this.getFavorites();
    if (!favorites.some(fav => fav.id === movie.id)) {
      favorites.push(movie);
      this.saveFavorites(favorites);
    }
  }

  removeFavorite(movieId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.id !== movieId);
    this.saveFavorites(favorites);
  }

  private saveFavorites(favorites: any[]): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}