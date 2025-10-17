import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component'; 
import { ImageUrlPipe } from './pipes/image-url.pipe';

import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MovieCardComponent,
    SpinnerComponent,
    PaginationComponent, 
    ImageUrlPipe
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    MovieCardComponent,
    SpinnerComponent,
    PaginationComponent, 
    ImageUrlPipe,
    CommonModule
  ]
})
export class SharedModule { }