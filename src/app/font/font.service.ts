import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Font} from './font.model';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  private _renderer: Renderer2;

  constructor(
    private _rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  setFont(font: Font) {
    this._renderer.setStyle(this._document.body, 'font-family', font.fontFamily);
  }
}
