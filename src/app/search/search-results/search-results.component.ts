import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import data from '../../data.json';
import { SearchItemComponent } from '../search-item/search-item.component';
import { ResultModel } from '../types/resultModel';
import { sortType } from '../types/sortType';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  results: ResultModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search: string = params['search'];
      const searchWord: string = params['word'];
      const count: sortType = params['count'];
      const date: sortType = params['date'];

      if (search && search.length > 0) {
        this.searchFn(search, 'title');
      }
      if (searchWord && searchWord.length > 0) {
        this.searchFn(searchWord, 'description');
      }
      if (!search && !searchWord) {
        this.results = [];
      }
      if (count) {
        this.sortByCount(count);
      }
      if (date) {
        this.sortByDate(date);
      }
    });
  }

  private searchFn(value: string, searchKey: 'title' | 'description') {
    this.results = data.items.filter((item) =>
      item.snippet[searchKey].toLowerCase().includes(value.toLowerCase())
    );
  }

  private sortByCount(value: sortType) {
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
  }

  private sortByDate(value: sortType) {
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
  }
}
