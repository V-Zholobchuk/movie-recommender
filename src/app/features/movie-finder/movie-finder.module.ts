import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { MovieFinderComponent } from './movie-finder.component';
import { MovieFiltersComponent } from './components/movie-filters/movie-filters.component';
import { SharedModule } from '../../shared/shared.module'; 

import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  { path: '', component: MovieFinderComponent }
];

@NgModule({
  declarations: [
    MovieFinderComponent,
    MovieFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    SharedModule, 
    RouterModule.forChild(routes), 
    TranslateModule
  ]
})
export class MovieFinderModule { }