import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root'
})
export class SanitizerService {

  constructor(
    private _domSanitizer: DomSanitizer
  ) {
  }

  sanitize(text: string) {
    return this._domSanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(text));
  }
}
