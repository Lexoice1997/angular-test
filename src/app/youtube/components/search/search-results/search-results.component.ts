import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { youtubeStore } from '../../../../redux/youtube.store';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchService } from '../../../services/search.service';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent, PaginationComponent],
  providers: [SearchService],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  readonly store = inject(youtubeStore);

  constructor(private route: ActivatedRoute) {}

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
        this.store.loadVideos({ search, sortBy: sortBy() });
      }
    });
  }
}
