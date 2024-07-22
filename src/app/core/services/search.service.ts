import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

@Injectable()
export class SearchService {
  constructor(private router: Router) {}

  searchFn(queryParams: Params, value: string, searchKey: 'search' | 'word') {
    if (value === '') {
      const copyQueryParams = { ...queryParams };
      delete copyQueryParams[searchKey];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    } else {
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          [searchKey]: value,
        },
      });
    }
  }

  sortByAscNDesc(queryParams: Params, key: string) {
    if (!queryParams.hasOwnProperty(key)) {
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          [key]: 'ASC',
        },
      });
    } else if (queryParams[key] === 'ASC') {
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          [key]: 'DESC',
        },
      });
    } else {
      const copyQueryParams = { ...queryParams };
      delete copyQueryParams[key];
      this.router.navigate([], {
        queryParams: {
          ...copyQueryParams,
        },
      });
    }
  }
}
