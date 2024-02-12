import {inject, InjectionToken} from '@angular/core';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {Font} from './font.model';
import {FontService} from './font.service';

type FontState = {
  selected: Font | null,
  readonly fonts: Font[]
};

const fonts = [
  {
    fontFamily: 'Inter, sans-serif',
    class: 'inter',
    title: 'Sans Serif'
  },
  {
    fontFamily: 'Lora, serif',
    class: 'lora',
    title: 'Serif'
  },
  {
    fontFamily: 'Inconsolata, monospace',
    class: 'inconsolata',
    title: 'Mono'
  }
]

const initialState: FontState = {
  selected: null,
  fonts
};

export const FONT_STATE = new InjectionToken<FontState>('FontState', {
  factory: () => initialState,
  providedIn: 'root'
});

export const FontStore = signalStore(
  {providedIn: 'root'},
  withState(() => inject(FONT_STATE)),
  withMethods((store, fontService = inject(FontService)) => ({
    setFont: (font: Font) => {
      fontService.setFont(font);
      patchState(store, {
        selected: font
      })
    }
  }))
);
