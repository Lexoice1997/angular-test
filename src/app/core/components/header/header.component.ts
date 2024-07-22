import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { SearchService } from '../../services/search.service';
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
  providers: [SearchService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibleFilter: boolean = true;
  searchValue: string = '';
  searchByWordValue: string = '';
  queryParams: Params = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchValue = params['search'];
      this.searchByWordValue = params['word'];
      this.queryParams = params;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  toggleVisibleFilter() {
    this.visibleFilter = !this.visibleFilter;
  }

  onSearchValue(value: string) {
    this.searchService.searchFn(this.queryParams, value, 'search');
  }

  onSearchWordNSentence(value: string) {
    this.searchService.searchFn(this.queryParams, value, 'word');
  }

  sortByDate() {
    this.searchService.sortByAscNDesc(this.queryParams, 'date');
  }

  sortByCounts() {
    this.searchService.sortByAscNDesc(this.queryParams, 'count');
  }
}
