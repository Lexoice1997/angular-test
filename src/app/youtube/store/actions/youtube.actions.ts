import { createAction, props } from '@ngrx/store';

import { SearchModel } from '../../models/searchModel';

export const loadVideos = createAction('[Youtube] Load');
export const loadVideosSuccess = createAction(
  '[Youtube] Load Success',
  props<{ videos: SearchModel[] }>()
);
export const loadVideosFailed = createAction('[Youtube] Load One Failed');

export const loadOneVideo = createAction(
  '[Youtube] Load One',
  props<{ a: string }>()
);
export const loadOneVideoSuccess = createAction(
  '[Youtube] Load Success',
  props<{ video: SearchModel[] | null }>()
);
export const loadOneVideoFailed = createAction('[Youtube] Load One Failed');

export const addVideoSuccess = createAction(
  '[Youtube] Add todo Success',
  props<{ video: SearchModel }>()
);
