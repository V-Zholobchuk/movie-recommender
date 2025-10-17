import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { UserListsComponent } from './user-lists.component';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  { path: '', component: UserListsComponent }
];

@NgModule({
  declarations: [
    UserListsComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class UserListsModule { }