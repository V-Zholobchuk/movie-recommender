import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-recommender';
  
  constructor(
    public themeService: ThemeService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'uk']);
    translate.setDefaultLang('uk');
    
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|uk/) ? browserLang : 'uk');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }
}