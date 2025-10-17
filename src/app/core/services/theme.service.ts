import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'dark';
  private readonly THEME_KEY = 'app_theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark';
    this.setTheme(savedTheme || 'dark'); 
  }

  setTheme(theme: 'light' | 'dark'): void {
    const oldTheme = this.currentTheme;
    this.currentTheme = theme;

    this.renderer.removeClass(document.body, `${oldTheme}-theme`);
    this.renderer.addClass(document.body, `${theme}-theme`);

    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }
}