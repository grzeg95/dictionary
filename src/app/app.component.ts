import {Component, inject, OnInit, Signal, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ThemeSelectorService} from '@grzeg95/angular-lib-theme-selector';
import {Font} from './font/font.model';
import {FontStore} from './font/font.store';
import {PhaseSearchBarComponent} from './phase/phase-search-bar/phase-search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatSlideToggle,
    PhaseSearchBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent implements OnInit {

  private readonly _fontStore = inject(FontStore);
  private readonly _themeSelectorService = inject(ThemeSelectorService);

  readonly fonts: Signal<Font[]> = this._fontStore.fonts;
  readonly selectedFont: Signal<Font | null> = this._fontStore.selected;
  readonly setFont = this._fontStore.setFont;

  readonly selectedTheme: Signal<string> = this._themeSelectorService.theme;

  ngOnInit() {

    this.setFont(this.fonts()[0]);

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (!isDarkMode && !isLightMode || isDarkMode) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  setDarkMode(isDarkMode: boolean) {

    if (isDarkMode) {
      this._themeSelectorService.select('dark-theme');
    } else {
      this._themeSelectorService.select('light-theme');
    }
  }
}
