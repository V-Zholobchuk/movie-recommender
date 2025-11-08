import { Component } from '@angular/core';
import { ThemeService, AppTheme } from './core/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-recommender';
  
  public previousTheme: '1' | '2'; 

  constructor(
    public themeService: ThemeService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'uk']);
    translate.setDefaultLang('uk');
    
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|uk/) ? browserLang : 'uk');

    this.previousTheme = this.isDarkTheme ? '2' : '1';
  }

  public get isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === 'dark';
  }

  setTheme(theme: AppTheme): void {
    this.previousTheme = this.isDarkTheme ? '2' : '1';
    this.themeService.setTheme(theme);
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }
}