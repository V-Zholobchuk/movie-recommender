import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'finder', pathMatch: 'full' },
  
  { 
    path: 'finder', 
    loadChildren: () => import('./features/movie-finder/movie-finder.module').then(m => m.MovieFinderModule) 
  },
  
{
path: 'quiz', 
    loadChildren: () => import('./features/quiz/quiz.module').then(m => m.QuizModule) 
  },

  { 
    path: 'movie/:id', 
    loadChildren: () => import('./features/movie-details/movie-details.module').then(m => m.MovieDetailsModule) 
  },
  { 
    path: 'lists', 
    loadChildren: () => import('./features/user-lists/user-lists.module').then(m => m.UserListsModule) 
  },
  
  { path: '**', redirectTo: 'finder' } 


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }