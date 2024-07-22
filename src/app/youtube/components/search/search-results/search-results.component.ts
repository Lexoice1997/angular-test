import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { sortType } from '../../../../core/types/sortType';
import { ResultModel } from '../../../models/resultModel';
import { SortService } from '../../../services/sort.service';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent],
  providers: [SortService],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  results: ResultModel[];

  constructor(private route: ActivatedRoute, private sortService: SortService) {
    this.results = this.sortService.results;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search: string = params['search'];
      const searchWord: string = params['word'];
      const count: sortType = params['count'];
      const date: sortType = params['date'];

      if (search && search.length > 0) {
        this.results = this.sortService.searchFn(search, 'title');
      }
      if (searchWord && searchWord.length > 0) {
        this.results = this.sortService.searchFn(searchWord, 'description');
      }
      if (!search && !searchWord) {
        this.results = this.results = [];
      }
      if (count) {
        this.results = this.sortService.sortByCount(count);
      }
      if (date) {
        this.results = this.sortService.sortByDate(date);
      }
    });
  }
}
