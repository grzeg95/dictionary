import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ActivatedRoute} from '@angular/router';
import {PhaseStore} from '../phase.store';

@Component({
  selector: 'app-phase-search-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './phase-search-bar.component.html',
  styleUrl: './phase-search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-phase-search-bar'
  }
})
export class PhaseSearchBarComponent {

  private readonly _phaseStore = inject(PhaseStore);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly form = new FormGroup({
    phase: new FormControl('', [Validators.required])
  });

  handleFormSubmit() {
    this._phaseStore.loadPhase({
      phase: this.form.controls.phase.value,
      activatedRoute: this._activatedRoute
    });
  }
}
