import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchModel } from '../../../models/searchModel';
import { SearchService } from '../../../services/search.service';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent],
  providers: [SearchService],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public results: SearchModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const search: string = params['search'];
      const searchWord: string = params['word'];
      const count = params['viewCount'];
      const date = params['date'];
      const sortBy = () => {
        if (count && !date) {
          return 'viewCount';
        }
        if (date && !count) {
          return 'date';
        }
        return false;
      };

      if (search && search.length > 0) {
        this.searchService.searchFn(search, sortBy()).subscribe((data) => {
          this.results = data.items;

          this.searchService
            .statisticsFn(data.items.map((item) => item.id.videoId))
            .subscribe((res) => {
              this.results = res.items;
            });
        });
      }

      if (!search && !searchWord) {
        this.results = [];
      }
    });
  }
}
