import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { VideoModel } from '../youtube/models/videoModel';
import { SearchService } from '../youtube/services/search.service';

type YoutubeState = {
  videos: VideoModel[];
  video: VideoModel;
  page: number;
  isLoading: boolean;
  error: string | unknown;
};

const initialState: YoutubeState = {
  videos: [],
  page: 1,
  video: {
    etag: '',
    id: '',
    kind: '',
    isFavorite: false,
    snippet: {
      publishedAt: '',
      channelId: '',
      title: '',
      description: '',
      thumbnails: {
        high: { url: '', width: 0, height: 0 },
      },
      channelTitle: '',
      tags: [],
      categoryId: '',
      liveBroadcastContent: '',
      localized: {
        title: '',
        description: '',
      },
      defaultAudioLanguage: '',
    },
  },
  isLoading: false,
  error: '',
};

export const youtubeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ videos, page }) => ({
    favorites: computed(() => videos().filter((item) => item.isFavorite)),
    favoritesCount: computed(
      () => videos().filter((item) => item.isFavorite).length
    ),
    currentPageVideos: computed(() => {
      let result = [];
      let count = 0;
      for (let i = (page() - 1) * 20; i < videos().length; i++) {
        if (count < 20) {
          result.push(videos()[i]);
          count++;
        } else {
          return result;
        }
      }
      return result;
    }),
  })),
  withMethods((store, searchService = inject(SearchService)) => ({
    loadOneVideo: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) =>
          searchService.getOneVideo(query).pipe(
            tapResponse({
              next: (video) =>
                patchState(store, {
                  video: { ...video.items?.[0], isFavorite: false },
                }),
              error: (err) =>
                patchState(store, { error: err, isLoading: false }),
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        )
      )
    ),
    loadVideos: rxMethod<{ search: string; sortBy: boolean | string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ search, sortBy }) =>
          searchService.searchFn(search, sortBy).pipe(
            switchMap((data) =>
              searchService
                .statisticsFn(data.items.map((item) => item.id.videoId))
                .pipe(
                  tapResponse({
                    next: (videos) =>
                      patchState(store, {
                        videos: videos.items.map((item) => ({
                          ...item,
                          isFavorite: false,
                        })),
                      }),
                    error: (err) =>
                      patchState(store, { error: err, isLoading: false }),
                    finalize: () => patchState(store, { isLoading: false }),
                  })
                )
            )
          )
        )
      )
    ),
    setOneVideo(id: string) {
      patchState(store, (state) => ({
        video: state.videos.find((item) => item.id === id),
      }));
    },
    addVideo(video: VideoModel) {
      patchState(store, { videos: [video, ...store.videos()] });
    },
    addToFavorite(id: string) {
      patchState(store, {
        videos: store.videos().map((item) => {
          if (item.id === id) {
            return { ...item, isFavorite: true };
          }
          return item;
        }),
      });
    },
    removeFromFavorite(id: string) {
      patchState(store, {
        videos: store.videos().map((item) => {
          if (item.id === id) {
            return { ...item, isFavorite: false };
          }
          return item;
        }),
      });
    },
    deleteVideo(id: string) {
      patchState(store, {
        videos: store.videos().filter((item) => item.id !== id),
      });
    },
    setPage(page: number) {
      patchState(store, {
        page,
      });
    },
  }))
);
