export interface Pagination<T> {
  etag: string;
  items: T[];
  kind: string;
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
}