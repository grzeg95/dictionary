import {Component, inject, OnInit, Signal, ViewEncapsulation} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {Font} from './font/font.model';
import {FontStore} from './font/font.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
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

  fonts: Signal<Font[]> = this._fontStore.fonts;
  selectedFont: Signal<Font | null> = this._fontStore.selected;
  setFont = this._fontStore.setFont;

  ngOnInit() {
    this.setFont(this.fonts()[0]);
  }
}
