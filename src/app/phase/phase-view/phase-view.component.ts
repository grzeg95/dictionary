import {NgClass} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  ViewEncapsulation
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ActivatedRoute} from '@angular/router';
import {BreakpointService} from '../../breakepoint/breakpoint.service';
import {FontStore} from '../../font/font.store';
import {PhaseSearchBarComponent} from '../phase-search-bar/phase-search-bar.component';
import {Phase, PhaseError, PhasePhonetic} from '../phase.model';
import {PhaseStore} from '../phase.store';

@Component({
  selector: 'app-phase-view',
  standalone: true,
  imports: [
    PhaseSearchBarComponent,
    NgClass,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './phase-view.component.html',
  styleUrl: './phase-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-phase-view'
  }
})
export class PhaseViewComponent implements OnInit {

  private readonly _phaseStore = inject(PhaseStore);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _breakPointsService = inject(BreakpointService);
  private readonly _fontStore = inject(FontStore);

  readonly mdUp: Signal<boolean> = this._breakPointsService.mdUp;

  readonly sansSerif: Signal<boolean> = this._fontStore.sansSerif;
  readonly serif: Signal<boolean> = this._fontStore.serif;
  readonly mono: Signal<boolean> = this._fontStore.mono;

  // before phase-view
  // DO NOT REMOVE
  // - add mat-mdc-form-field gap and line-height of mat-mdc-form-field-bottom-align::before
  // - subtract space between input and phase.word
  readonly spacingA = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 1;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 11;
    }

    if (!this.mdUp() && this.serif()) {
      return 0;
    }

    if (this.mdUp() && this.serif()) {
      return 8;
    }

    if (!this.mdUp() && this.mono()) {
      return 6;
    }

    if (this.mdUp() && this.mono()) {
      return 21;
    }

    return 0;
  });

  // after phase.word
  readonly spacingB = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 8;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 8;
    }

    if (!this.mdUp() && this.serif()) {
      return 7;
    }

    if (this.mdUp() && this.serif()) {
      return 7;
    }

    if (!this.mdUp() && this.mono()) {
      return 9;
    }

    if (this.mdUp() && this.mono()) {
      return 11;
    }

    return 0;
  });

  // before phaseMeaning.partOfSpeech
  readonly spacingC = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 29;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 40;
    }

    if (!this.mdUp() && this.serif()) {
      return 28;
    }

    if (this.mdUp() && this.serif()) {
      return 39;
    }

    if (!this.mdUp() && this.mono()) {
      return 31;
    }

    if (this.mdUp() && this.mono()) {
      return 42;
    }

    return 0;
  });

  // after phaseMeaning.partOfSpeech
  readonly spacingD = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 32;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 40;
    }

    if (!this.mdUp() && this.serif()) {
      return 31;
    }

    if (this.mdUp() && this.serif()) {
      return 38;
    }

    if (!this.mdUp() && this.mono()) {
      return 34;
    }

    if (this.mdUp() && this.mono()) {
      return 43;
    }

    return 0;
  });

  // after word "Meaning"
  // before words "Synonyms", "Antonyms" and it's value
  // before separating line with source
  readonly spacingE = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 17;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 25;
    }

    if (!this.mdUp() && this.serif()) {
      return 16;
    }

    if (this.mdUp() && this.serif()) {
      return 24;
    }

    if (!this.mdUp() && this.mono()) {
      return 17;
    }

    if (this.mdUp() && this.mono()) {
      return 27;
    }

    return 0;
  });

  // after separating line with source
  // after block with source
  readonly spacingF = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 24;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 19;
    }

    if (!this.mdUp() && this.serif()) {
      return 24;
    }

    if (this.mdUp() && this.serif()) {
      return 19;
    }

    if (!this.mdUp() && this.mono()) {
      return 26;
    }

    if (this.mdUp() && this.mono()) {
      return 21;
    }

    return 0;
  });

  // gap between phaseMeaning.partOfSpeech and separating line
  readonly spacingG = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 25;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 26;
    }

    if (!this.mdUp() && this.serif()) {
      return 21;
    }

    if (this.mdUp() && this.serif()) {
      return 29;
    }

    if (!this.mdUp() && this.mono()) {
      return 21;
    }

    if (this.mdUp() && this.mono()) {
      return 32;
    }

    return 0;
  });

  // before values of words "Synonyms", "Antonyms"
  readonly spacingH = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return 24;
    }

    if (this.mdUp() && this.sansSerif()) {
      return 22;
    }

    if (!this.mdUp() && this.serif()) {
      return 26;
    }

    if (this.mdUp() && this.serif()) {
      return 24;
    }

    if (!this.mdUp() && this.mono()) {
      return 39;
    }

    if (this.mdUp() && this.mono()) {
      return 40;
    }

    return 0;
  });

  // after word "Source"
  readonly spacingI = computed(() => {

    if (this.mdUp() && this.sansSerif()) {
      return 20;
    }

    if (this.mdUp() && this.serif()) {
      return 21;
    }

    if (this.mdUp() && this.mono()) {
      return 25;
    }

    return 0;
  });

  // before icon value of "Source"
  readonly spacingJ = computed(() => {

    if (this.sansSerif()) {
      return 8;
    }

    if (this.serif()) {
      return 14;
    }

    if (this.mono()) {
      return 7;
    }

    return 0;
  });

  // phaseMeaning.partOfSpeech
  readonly fontWeightBoldA = computed(() => {

    if (this.mdUp() && this.serif()) {
      return false;
    }

    return true;
  });

  // phaseMeaning.partOfSpeech
  readonly fontItalicA = computed(() => {

    if (!this.mdUp() && this.sansSerif()) {
      return true;
    }

    if (this.mdUp() && this.sansSerif()) {
      return true;
    }

    return false;
  });

  // word "Source"
  readonly textDecorationNoneA = computed(() => {

    if (this.mdUp() && this.mono()) {
      return true;
    }

    return false;
  });

  // link after word "Source"
  readonly textDecorationNoneB = computed(() => {

    if (!this.mdUp() && this.mono()) {
      return true;
    }

    if (this.mdUp() && this.mono()) {
      return true;
    }

    return false;
  });

  readonly isLoading: Signal<boolean> = this._phaseStore.isLoading;
  readonly phase: Signal<Phase | undefined | null> = this._phaseStore.phase;
  readonly error: Signal<PhaseError | null> = this._phaseStore.error;
  readonly phonetic: Signal<PhasePhonetic | null> = this._phaseStore.phonetic;

  phasePhoneticAudio: HTMLAudioElement | null = null;
  readonly phasePhoneticAudioIsLoading = signal(false);
  readonly phasePhoneticAudioIsPlaying = signal<boolean>(false);

  ngOnInit() {

    this._activatedRoute.params.subscribe((params) => {
      const phase = params?.['phase'];

      if (phase) {
        this._phaseStore.loadPhase({
          phase,
          activatedRoute: this._activatedRoute
        });
      }
    });
  }

  stopPhoneticAudio() {

    if (this.phasePhoneticAudio) {
      this.phasePhoneticAudio.pause();
      this.phasePhoneticAudio.currentTime = 0;
      this.phasePhoneticAudioIsPlaying.set(false);
      this.phasePhoneticAudio = null;
    }
  }

  playPhasePhonetic(src: string) {

    if (this.phasePhoneticAudioIsPlaying()) {
      return;
    }

    this.phasePhoneticAudioIsLoading.set(true);

    this.phasePhoneticAudio = new Audio(src);
    this.phasePhoneticAudio.load();

    this.phasePhoneticAudio.oncanplaythrough = ev => {

      this.phasePhoneticAudioIsLoading.set(false);

      this.phasePhoneticAudio?.play().finally(() => {
        this.phasePhoneticAudioIsPlaying.set(true);
      });
    }

    this.phasePhoneticAudio.onended = ev => {
      this.phasePhoneticAudioIsPlaying.set(false);
    }

    this.phasePhoneticAudio.onerror = ev => {
      this.phasePhoneticAudioIsLoading.set(false);
    }
  }

  handleClickButtonPlayPhasePhonetic(audio: string) {
    if (this.phasePhoneticAudioIsLoading() || this.phasePhoneticAudioIsPlaying()) {
      this.stopPhoneticAudio();
    } else {
      this.playPhasePhonetic(audio);
    }
  }
}
