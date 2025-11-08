import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { QuizStateService } from '../../../../core/services/quiz-state.service'; 


const RATING_OPTIONS = [ { key: 'G', translationKey: 'QUIZ.MPAA_G' }, { key: 'PG', translationKey: 'QUIZ.MPAA_PG' }, { key: 'PG-13', translationKey: 'QUIZ.MPAA_PG13' }, { key: 'R', translationKey: 'QUIZ.MPAA_R' }];
const CATEGORY_OPTIONS = [ { key: 'no_preference', translationKey: 'QUIZ.CATEGORY_NO_PREFERENCE' }, { key: '9672', translationKey: 'QUIZ.CATEGORY_TRUE_STORY' }, { key: '156035', translationKey: 'QUIZ.CATEGORY_LIFE_CHANGING' }, { key: '9715', translationKey: 'QUIZ.CATEGORY_SPY_COP' }, { key: '14602', translationKey: 'QUIZ.CATEGORY_SPACE' }, { key: '9743', translationKey: 'QUIZ.CATEGORY_HEIST' }, { key: '818', translationKey: 'QUIZ.CATEGORY_BOOK' }, { key: '210024', translationKey: 'QUIZ.CATEGORY_IMDB_TOP' }];

@Component({
  selector: 'app-quiz-wizard',
  templateUrl: './quiz-wizard.component.html',
  styleUrls: ['./quiz-wizard.component.css']
})
export class QuizWizardComponent implements OnInit {
  
  
  genresList: any[] = [];
  ratingOptions = RATING_OPTIONS;
  categoryOptions = CATEGORY_OPTIONS;
  
  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    private router: Router,
    public quizState: QuizStateService
  ) { }

  ngOnInit(): void {
    this.loadGenres();
    
    this.translate.onLangChange.subscribe(() => {
      this.loadGenres(); 
      
      if (this.quizState.currentStep > 7) { 
        this.isLoadingResult = true;

        if (this.quizState.currentRecommendation) {
          this.apiService.getMovieDetails(this.quizState.currentRecommendation.id)
            .subscribe((translatedMovie: any) => {
              this.quizState.currentRecommendation = translatedMovie;
            });
        }
        
        this.apiService.discoverMovies(this.quizState.currentApiFilters, 1)
          .pipe(finalize(() => this.isLoadingResult = false))
          .subscribe((response: any) => {
            if (response.results) {
              this.quizState.recommendedMovies = response.results.filter((m: any) => !this.quizState.seenMovieIds.includes(m.id));
            } else {
              this.quizState.recommendedMovies = [];
            }
          });
      }
    });
  }

  
  get currentStep(): number {
    return this.quizState.currentStep;
  }
  get answers() {
    return this.quizState.answers;
  }
  get isLoadingResult(): boolean {
    return this.quizState.isLoadingResult;
  }
  set isLoadingResult(val: boolean) {
    this.quizState.isLoadingResult = val;
  }
  get currentRecommendation() {
    return this.quizState.currentRecommendation;
  }
  get noMoreResults(): boolean {
    return this.quizState.noMoreResults;
  }


  loadGenres(): void {
    this.apiService.getGenres().subscribe((response: any) => {
      const excludedIds = [10770, 99, 10752]; 
      this.genresList = response.genres.filter((g: any) => !excludedIds.includes(g.id));
    });
  }

  nextStep(): void {
    if (this.currentStep === 3 && this.answers.genres.length === 0) { alert('Будь ласка, оберіть хоча б один жанр.'); return; }
    if (this.currentStep === 6 && this.answers.certifications.length === 0) { alert('Будь ласка, оберіть хоча б один рейтинг.'); return; }
    if (this.currentStep === 7 && this.answers.keywords.length === 0) { alert('Будь ласка, оберіть хоча б одну категорію.'); return; }

    this.quizState.currentStep++; 
    console.log('Відповіді:', this.answers);

    if (this.currentStep > 7) {
      this.showResults();
    }
  }

  prevStep(): void {
    if (this.currentStep === 7) { 
      this.answers.keywords = []; 
      if (this.answers.ratingImportant === false) { this.quizState.currentStep = 5; return; }
    }
    if (this.currentStep === 6) this.answers.certifications = [];
    if (this.currentStep > 1) this.quizState.currentStep--;
  }
  
  selectMood(mood: 'happy' | 'neutral' | 'sad'): void { this.answers.mood = mood; this.nextStep(); }
  selectOccasion(occasion: string): void { this.answers.occasion = occasion; this.nextStep(); }
  selectAge(age: 'any' | '5' | '10' | '25'): void { this.answers.age = age; this.nextStep(); }
  
  toggleGenre(genreId: string): void { const i = this.answers.genres.indexOf(genreId); if (i > -1) this.answers.genres.splice(i, 1); else this.answers.genres.push(genreId); }
  isGenreSelected(genreId: string): boolean { return this.answers.genres.includes(genreId); }
  
  selectRatingImportance(isImportant: boolean): void {
    this.answers.ratingImportant = isImportant;
    if (isImportant) this.nextStep();
    else this.quizState.currentStep = 7;
  }
  
  toggleCertification(key: string): void { const i = this.answers.certifications.indexOf(key); if (i > -1) this.answers.certifications.splice(i, 1); else this.answers.certifications.push(key); }
  isCertificationSelected(key: string): boolean { return this.answers.certifications.includes(key); }

  toggleKeyword(key: string): void { if (key === 'no_preference') { this.answers.keywords = ['no_preference']; this.nextStep(); return; } const noPrefIndex = this.answers.keywords.indexOf('no_preference'); if (noPrefIndex > -1) this.answers.keywords.splice(noPrefIndex, 1); const index = this.answers.keywords.indexOf(key); if (index > -1) this.answers.keywords.splice(index, 1); else this.answers.keywords.push(key); }
  isKeywordSelected(key: string): boolean { return this.answers.keywords.includes(key); }
  
  showResults(): void {
    this.quizState.currentStep = 8;
    this.isLoadingResult = true;
    this.quizState.noMoreResults = false;
    this.quizState.seenMovieIds = [];
    this.quizState.currentApiFilters = {};

    const apiFilters: any = { 'sort_by': 'popularity.desc', 'vote_count.gte': 100 };
    let genres = [...this.answers.genres];
    if (this.answers.mood === 'happy') genres.push('35');
    if (this.answers.mood === 'sad') genres.push('18');
    if (genres.length > 0) apiFilters['with_genres'] = genres.join(',');
    const currentYear = new Date().getFullYear();
    if (this.answers.age !== 'any') {
      const yearsAgo = parseInt(this.answers.age || '0', 10);
      apiFilters['primary_release_date.gte'] = `${currentYear - yearsAgo}-01-01`;
    }
    if (this.answers.ratingImportant && this.answers.certifications.length > 0) {
      apiFilters['certification_country'] = 'US';
      apiFilters['certification.lte'] = this.answers.certifications.join('|');
    }
    if (!this.answers.keywords.includes('no_preference') && this.answers.keywords.length > 0) {
      apiFilters['with_keywords'] = this.answers.keywords.join(',');
    }
    
    this.quizState.currentApiFilters = apiFilters;

    this.apiService.discoverMovies(this.quizState.currentApiFilters, 1)
      .pipe(finalize(() => this.isLoadingResult = false))
      .subscribe((response: any) => {
        if (response.results && response.results.length > 0) {
          this.quizState.recommendedMovies = response.results;
          this.showNextRecommendation();
        } else {
          this.quizState.noMoreResults = true;
        }
      });
  }

  showNextRecommendation(): void {
    if (this.quizState.recommendedMovies.length > 0) {
      this.quizState.currentRecommendation = this.quizState.recommendedMovies.shift();
      this.quizState.seenMovieIds.push(this.quizState.currentRecommendation.id); 
    } else {
      this.quizState.currentRecommendation = null;
      this.quizState.noMoreResults = true;
    }
  }

  startOver(): void {
    this.quizState.resetState();
  }
  
  showDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}