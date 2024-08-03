import { routerReducer, RouterState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import {
  VideoState,
  youtubeReducer,
} from '../../youtube/store/reducers/youtube.reducers';

export interface AppState {
  youtubeFeature: VideoState;
  router: RouterState;
}

export const appReducers: ActionReducerMap<AppState> = {
  youtubeFeature: youtubeReducer,
  router: routerReducer,
};
