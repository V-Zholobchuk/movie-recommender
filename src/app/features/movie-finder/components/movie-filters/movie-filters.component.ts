import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Options, LabelType } from '@angular-slider/ngx-slider'; 
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FinderStateService } from '../../../../core/services/finder-state.service';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.css']
})

export class MovieFiltersComponent implements OnInit, OnDestroy {

  
  genres: any[] = [];
  yearOptions: number[] = []; 

  yearSliderOptions: Options = {
    floor: 1960,
    ceil: new Date().getFullYear(),
    step: 1
  };
  
  ratingSliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 0.1,
    showTicks: false,
    translate: (value: number, label: LabelType): string => {
      return value.toFixed(1);
    }
  };

  @Output() filterChange = new EventEmitter<any>();

  private debounceSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

@Output() closeFilters = new EventEmitter<void>();

  constructor(
    private apiService: ApiService,
    private translate: TranslateService,
    public finderState: FinderStateService 
  ) { }

  ngOnInit(): void {
    for (let year = this.finderState.filters.yearTo; year >= this.finderState.filters.yearFrom; year--) {
      this.yearOptions.push(year);
    }

    this.debounceSubject.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applyFilters();
    });

    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadGenres();
    });

    this.loadGenres();
    
    
    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadGenres(): void {
    this.apiService.getGenres().subscribe((response: any) => {
      this.genres = response.genres;
    });
  }

  onSliderChange(): void {
    this.debounceSubject.next();
  }

  onYearSelectChange(): void {
    this.applyFilters();
  }

  onOtherFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
   
    this.filterChange.emit(this.finderState.filters);
  }
  onClose(): void {
    this.closeFilters.emit();
  }
}