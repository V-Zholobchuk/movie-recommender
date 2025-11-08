import { Injectable } from '@angular/core';

export interface FinderFilters {
  genre: string;
  yearFrom: number; 
  yearTo: number;   
  rating: number;
  query: string;
  sortBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinderStateService {

  public filters: FinderFilters = {
    genre: '',
    yearFrom: 1960, 
    yearTo: new Date().getFullYear(), 
    rating: 5.0,
    query: '',
    sortBy: 'popularity.desc'
  };


  constructor() { }

}