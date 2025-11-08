import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: AppTheme = 'dark'; 
  private readonly THEME_KEY = 'app_theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as AppTheme;
    this.setTheme(savedTheme === 'light' ? 'light' : 'dark');
  }

  setTheme(theme: AppTheme): void {
    const oldTheme = this.currentTheme;
    this.currentTheme = theme;

    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'dim-theme');
    
    this.renderer.addClass(document.body, `${theme}-theme`);

    localStorage.setItem(this.THEME_KEY, theme);
  }

  getCurrentTheme(): AppTheme {
    return this.currentTheme;
  }
}