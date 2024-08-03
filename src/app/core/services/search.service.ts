import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

@Injectable()
export class SearchService {
  constructor(private router: Router) {}

  public searchFn(queryParams: Params, value: string, searchKey: 'search' | 'word') {
    if (value === '') {
      const copyQueryParams = { ...queryParams };
      delete copyQueryParams[searchKey];
      this.router.navigate(["/home"], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    } else {
      this.router.navigate(["/home"], {
        queryParams: {
          ...queryParams,
          [searchKey]: value,
        },
      });
    }
  }

  public sortByDate(queryParams: Params) {
    if (!queryParams.hasOwnProperty('date')) {
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          date: true,
        },
      });
    } else {
      const copyQueryParams = { ...queryParams };
      delete copyQueryParams['date'];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    }
  }

  public sortByCount(queryParams: Params) {
    if (!queryParams.hasOwnProperty('viewCount')) {
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          viewCount: true,
        },
      });
    } else {
      const copyQueryParams = { ...queryParams };
      delete copyQueryParams['viewCount'];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    }
  }
}
