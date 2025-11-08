import { Component } from '@angular/core';
import { ThemeService, AppTheme } from '../../../core/services/theme.service'; 

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {

  public previousTheme: '1' | '2'; 

  constructor(public themeService: ThemeService) {
    this.previousTheme = this.isDarkTheme ? '2' : '1';
  }

  public get isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }

  setTheme(theme: AppTheme): void {
    this.previousTheme = this.isDarkTheme ? '2' : '1';
    this.themeService.setTheme(theme);
  }
}