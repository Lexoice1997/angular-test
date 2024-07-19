import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CustomButtonComponent } from '../shared/custom-button/custom-button.component';
import { FilterIconComponent } from './icon/filter-icon.component';
import { ProfileIconComponent } from './icon/profile-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FilterIconComponent,
    ProfileIconComponent,
    CustomButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibleFilter: boolean = true;
  searchValue: string = '';
  searchByWordValue: string = '';
  queryParams: Params = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchValue = params['search'];
      this.searchByWordValue = params['word'];
      this.queryParams = params;
    });
  }

  toggleVisibleFilter() {
    this.visibleFilter = !this.visibleFilter;
  }

  onSearchValue(value: string) {
    this.searchFn(value, 'search');
  }

  onSearchWordNSentence(value: string) {
    this.searchFn(value, 'word');
  }

  private searchFn(value: string, searchKey: 'search' | 'word') {
    if (value === '') {
      const copyQueryParams = { ...this.queryParams };
      delete copyQueryParams[searchKey];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    } else {
      this.router.navigate([], {
        queryParams: {
          ...this.queryParams,
          [searchKey]: value,
        },
      });
    }
  }

  private sortByAscNDesc(key: string) {
    if (!this.queryParams.hasOwnProperty(key)) {
      this.router.navigate([], {
        queryParams: {
          ...this.queryParams,
          [key]: 'ASC',
        },
      });
    } else if (this.queryParams[key] === 'ASC') {
      this.router.navigate([], {
        queryParams: {
          ...this.queryParams,
          [key]: 'DESC',
        },
      });
    } else {
      const copyQueryParams = { ...this.queryParams };
      delete copyQueryParams[key];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    }
  }

  sortByDate() {
    this.sortByAscNDesc('date');
  }

  sortByCounts() {
    this.sortByAscNDesc('count');
  }
}
