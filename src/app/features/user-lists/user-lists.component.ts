import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  favoriteMovies: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteMovies = this.storageService.getFavorites();
  }
}