import {BreakpointObserver} from '@angular/cdk/layout';
import {computed, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Breakpoints} from './breakepoint';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private readonly _displayNameMap = new Map([
    [Breakpoints.extraSmall.selector, 'es'],
    [Breakpoints.small.selector, 'sm'],
    [Breakpoints.medium.selector, 'md'],
    [Breakpoints.large.selector, 'lg'],
    [Breakpoints.extraLarge.selector, 'xl'],
  ]);

  private readonly _upNameMap = new Map([
    ['esUp', new Set(['es', 'sm', 'md', 'lg', 'xl'])],
    ['smUp', new Set(['sm', 'md', 'lg', 'xl'])],
    ['mdUp', new Set(['md', 'lg', 'xl'])],
    ['lgUp', new Set(['lg', 'xl'])],
    ['xlUp', new Set(['xl'])],
  ]);

  private _currentScreenSize = signal<string | undefined>(undefined);

  es = computed(() => this._currentScreenSize() === 'es');
  sm = computed(() => this._currentScreenSize() === 'sm');
  md = computed(() => this._currentScreenSize() === 'md');
  lg = computed(() => this._currentScreenSize() === 'lg');
  xl = computed(() => this._currentScreenSize() === 'xl');

  esUp = computed(() => this._upNameMap.get('esUp')!.has(this._currentScreenSize() || ''));
  smUp = computed(() => this._upNameMap.get('smUp')!.has(this._currentScreenSize() || ''));
  mdUp = computed(() => this._upNameMap.get('mdUp')!.has(this._currentScreenSize() || ''));
  lgUp = computed(() => this._upNameMap.get('lgUp')!.has(this._currentScreenSize() || ''));
  xlUp = computed(() => this._upNameMap.get('xlUp')!.has(this._currentScreenSize() || ''));

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.extraSmall.selector,
        Breakpoints.small.selector,
        Breakpoints.medium.selector,
        Breakpoints.large.selector,
        Breakpoints.extraLarge.selector,
      ])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {

        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this._currentScreenSize.set(this._displayNameMap.get(query));
          }
        }
      });
  }
}
