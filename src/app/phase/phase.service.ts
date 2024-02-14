import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map} from 'rxjs';
import {Phase} from './phase.model';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private readonly _http = inject(HttpClient);

  getPhase(phase: string) {
    return this._http.get<Phase[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${phase}`).pipe(
      map((phases) => phases[0])
    );
  }
}
