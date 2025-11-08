import { Injectable } from '@angular/core';

// Копіюємо наш інтерфейс відповідей сюди
export interface QuizAnswers {
  mood: 'happy' | 'neutral' | 'sad' | null;
  occasion: string | null;
  genres: string[];
  age: 'any' | '5' | '10' | '25' | null;
  ratingImportant: boolean | null;
  certifications: string[];
  keywords: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {

  
  public currentStep: number = 1;
  
  public answers: QuizAnswers = {
    mood: null,
    occasion: null,
    genres: [],
    age: null,
    ratingImportant: null,
    certifications: [],
    keywords: []
  };

  public isLoadingResult: boolean = false;
  public recommendedMovies: any[] = [];
  public currentRecommendation: any = null;
  public noMoreResults: boolean = false;
  public seenMovieIds: number[] = [];
  public currentApiFilters: any = {};
  
  constructor() { }

  public resetState(): void {
    this.currentStep = 1;
    this.answers = {
      mood: null,
      occasion: null,
      genres: [],
      age: null,
      ratingImportant: null,
      certifications: [],
      keywords: []
    };
    this.isLoadingResult = false;
    this.recommendedMovies = [];
    this.currentRecommendation = null;
    this.noMoreResults = false;
    this.seenMovieIds = [];
    this.currentApiFilters = {};
  }
}