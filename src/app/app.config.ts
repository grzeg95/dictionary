import {HttpClient, provideHttpClient} from '@angular/common/http';
import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideThemeSelector} from '@grzeg95/angular-lib-theme-selector';
import {forkJoin, mergeMap} from 'rxjs';
import {SvgService} from '../services/svg.service';
import {routes} from './app.routes';
import {join} from 'path-browserify';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient, SvgService],
      useFactory: (http: HttpClient, svgService: SvgService) => {
        return () => {

          const imagesPath = '/assets/images/svgs';

          return http.get<{name: string; src: string;}[]>(join(imagesPath, 'index.json')).pipe(
            mergeMap((svgs) => {
              return forkJoin(svgs.map((svg) => svgService.registerSvg(svg.name, join(imagesPath, svg.src))));
            })
          );
        };
      }
    },
    provideThemeSelector({
      themes: ['light-theme', 'dark-theme']
    })
  ]
};
