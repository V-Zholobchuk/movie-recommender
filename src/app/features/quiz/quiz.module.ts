import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TranslateModule } from '@ngx-translate/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizWizardComponent } from './components/quiz-wizard/quiz-wizard.component';
import { SharedModule } from '../../shared/shared.module'; 

@NgModule({
  declarations: [
    QuizWizardComponent
  ],
  imports: [
    CommonModule, 
    QuizRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class QuizModule { }