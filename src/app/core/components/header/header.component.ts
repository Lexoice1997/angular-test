import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';

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
    FormsModule,
  ],
  providers: [SearchService, NgModel],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  visibleFilter: boolean = true;
  searchValue: string = '';
  searchByWordValue: string = '';
  queryParams: Params = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchValue = params['search'];
      this.searchByWordValue = params['word'];
      this.queryParams = params;
    });
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  performSearch(searchValue: string) {
    this.searchService.searchFn(this.queryParams, searchValue, 'search');
  }

  onLogout() {
    this.authService.logout();
  }

  onLoginPage() {
    this.router.navigate(['/login']);
  }

  isLogged() {
    return this.authService.isLogging();
  }

  toggleVisibleFilter() {
    this.visibleFilter = !this.visibleFilter;
  }

  onSearchValue() {
    this.searchSubject.next(this.searchValue);
  }

  onSearchWordNSentence(value: string) {
    this.searchService.searchFn(this.queryParams, value, 'word');
  }

  sortByDate() {
    this.searchService.sortByDate(this.queryParams);
  }

  sortByCounts() {
    this.searchService.sortByCount(this.queryParams);
  }
}
