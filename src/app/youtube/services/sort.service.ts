import { Injectable } from '@angular/core';

import { sortType } from '../../core/types/sortType';
import data from '../../data.json';
import { ResultModel } from '../models/resultModel';

@Injectable()
export class SortService {
  results: ResultModel[] = [];

  constructor() {}

  searchFn(value: string, searchKey: 'title' | 'description') {
    this.results = data.items.filter((item) =>
      item.snippet[searchKey].toLowerCase().includes(value.toLowerCase())
    );
    return this.results;
  }

  sortByCount(value: sortType) {
    if (value === 'ASC') {
      this.results = this.results.sort(
        (a, b) =>
          Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
      );
    }
    if (value === 'DESC') {
      this.results = this.results.sort(
        (a, b) =>
          Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
      );
    }
    return this.results;
  }

  sortByDate(value: sortType) {
    if (value === 'ASC') {
      this.results = this.results.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
      );
    }
    if (value === 'DESC') {
      this.results = this.results.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );
    }
    return this.results;
  }
}
