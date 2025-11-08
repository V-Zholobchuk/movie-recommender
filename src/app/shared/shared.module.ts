import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component'; 
import { ImageUrlPipe } from './pipes/image-url.pipe';

import { TranslateModule } from '@ngx-translate/core';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component'; 

@NgModule({
  declarations: [
    MovieCardComponent,
    SpinnerComponent,
    PaginationComponent, 
    ImageUrlPipe,
    ThemeSwitcherComponent
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
    CommonModule,
    ThemeSwitcherComponent
  ]
})
export class SharedModule { }