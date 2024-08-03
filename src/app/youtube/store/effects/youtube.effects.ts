import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

import * as fromRoot from '../../../redux/reducers/app.reducer';
import { SearchService } from '../../services/search.service';
import * as YoutubeActions from '../actions/youtube.actions';

@Injectable({ providedIn: 'root' })
export class VideoEffects {
  searchService = inject(SearchService);

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.AppState>
  ) {}

  getOneVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(YoutubeActions.loadOneVideo),
      mergeMap((action) =>
        this.searchService.getOneVideo('2').pipe(
          map((video) => YoutubeActions.loadOneVideoSuccess({ video: null })),
          catchError(() => of(YoutubeActions.loadOneVideoFailed()))
        )
      )
    )
  );
}
