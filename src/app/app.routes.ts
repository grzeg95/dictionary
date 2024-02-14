import {Routes} from '@angular/router';
import {PhaseViewComponent} from './phase/phase-view/phase-view.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'phase/'
  },
  {
    path: 'phase',
    pathMatch: 'full',
    redirectTo: 'phase/'
  },
  {
    path: 'phase/:phase',
    component: PhaseViewComponent
  },
  {
    path: '**',
    redirectTo: 'phase/'
  }
];
