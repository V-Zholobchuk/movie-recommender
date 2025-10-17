import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module'; 

import { RouterModule, Routes } from '@angular/router';

import { MovieDetailsComponent } from './movie-details.component';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  { path: '', component: MovieDetailsComponent }
];

@NgModule({
  declarations: [
    MovieDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule.forChild(routes) ,
    TranslateModule
  ]
})
export class MovieDetailsModule { }