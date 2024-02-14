import {HttpErrorResponse} from '@angular/common/http';
import {computed, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, filter, of, pipe, switchMap, tap} from 'rxjs';
import {Phase, PhaseError} from './phase.model';
import {PhaseService} from './phase.service';

type PhaseState = {
  phase: Phase | null;
  isLoading: boolean;
  error: PhaseError | null;
};

const initialState: PhaseState = {
  phase: null,
  isLoading: false,
  error: null
};

export const PhaseStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, phaseService = inject(PhaseService), router = inject(Router)) => ({
    loadPhase: rxMethod<{phase: string | null, activatedRoute: ActivatedRoute}>(
      pipe(
        filter((payload): payload is {phase: string, activatedRoute: ActivatedRoute} => !!payload.phase),
        tap((payload) => {
          patchState(store, {
            isLoading: true
          });
          router.navigate(['../', payload.phase ? payload.phase : ''], {relativeTo: payload.activatedRoute});
        }),
        switchMap((payload) => {
          return phaseService.getPhase(payload.phase).pipe(
            tap((phaseResult) => {
              patchState(store, {
                isLoading: false,
                error: null,
                phase: phaseResult
              });
            }),
            catchError((error) => {

              patchState(store, {
                isLoading: false,
                error: {
                  title: 'Error.',
                  message: 'Something went wrong.',
                  resolution: 'Try again.',
                  phase: payload.phase
                },
                phase: null
              });

              if (error instanceof HttpErrorResponse) {
                if (error.status === 404) {

                  patchState(store, {
                    error: {
                      ...error.error,
                      phase: payload.phase
                    }
                  });
                }
              }

              return of(null);
            })
          )
        })
      )
    )
  })),
  withComputed((store) => ({
    phonetic: computed(() => {

      const phase = store.phase();

      if (!phase) {
        return null;
      }

      return phase.phonetics.find((phonetic) => phonetic.audio && phonetic.text) || null;
    })
  }))
);
