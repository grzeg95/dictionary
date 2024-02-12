import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {map, tap} from 'rxjs';
import {SanitizerService} from './sanitizer.service';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  constructor(
    private _http: HttpClient,
    private _matIconRegistry: MatIconRegistry,
    private _sanitizer: SanitizerService
  ) {}

  registerSvg(name: string, src: string) {
    return this._http.get(src, {responseType: 'text'}).pipe(
      map((text) => {
        return this._sanitizer.sanitize(text);
      }),
      tap((svg) => {
        this._matIconRegistry.addSvgIconLiteral(name, svg);
      })
    );
  }
}
