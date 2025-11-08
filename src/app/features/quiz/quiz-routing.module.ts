import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizWizardComponent } from './components/quiz-wizard/quiz-wizard.component';

const routes: Routes = [
  {
    path: '', 
    component: QuizWizardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }