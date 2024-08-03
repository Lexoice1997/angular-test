export interface VideoModel {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: DefaultSizesModel;
      medium?: DefaultSizesModel;
      high?: DefaultSizesModel;
      standard?: DefaultSizesModel;
      maxres?: DefaultSizesModel;
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  isFavorite: boolean;
  statistics?: StatisticsModel;
}

interface DefaultSizesModel {
  url: string;
  width: number;
  height: number;
}

interface StatisticsModel {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}
