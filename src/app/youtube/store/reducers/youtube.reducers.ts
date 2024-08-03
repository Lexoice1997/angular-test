import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { SearchModel } from '../../models/searchModel';
import * as youtubeActions from '../actions/youtube.actions';

export interface VideoState {
  videos: SearchModel[];
}

export const initialState: VideoState = {
  videos: [],
};

export const youtubeReducer = createReducer(
  initialState,
  on(youtubeActions.loadVideosSuccess, (state, { videos }) => ({
    ...state,
    videos: [...state.videos, ...videos],
  })),
  on(youtubeActions.addVideoSuccess, (state, { video }) => ({
    ...state,
    videos: [video, ...state.videos],
  }))
);

export const getVideoState =
  createFeatureSelector<VideoState>('youtubeFeature');
export const getVideos = createSelector(
  getVideoState,
  (state: VideoState) => state.videos
);
