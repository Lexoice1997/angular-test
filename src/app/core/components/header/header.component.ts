import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';
import { youtubeStore } from '../../../redux/youtube.store';
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
  readonly store = inject(youtubeStore);
  private searchSubject = new Subject<string>();
  private queryParams: Params = {};
  public visibleFilter: boolean = true;
  public searchValue: string = '';
  public searchByWordValue: string = '';

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

  private performSearch(searchValue: string) {
    this.searchService.searchFn(this.queryParams, searchValue, 'search');
  }

  public onLogout() {
    this.authService.logout();
  }

  public onLoginPage() {
    this.router.navigate(['/login']);
  }

  public onAdminPage() {
    this.router.navigate(['/admin']);
  }

  public onFavoritePage() {
    this.router.navigate(['/favorite']);
  }

  public onMainPage() {
    this.router.navigate(['/home']);
  }

  public isLogged() {
    return this.authService.isLogging();
  }

  public toggleVisibleFilter() {
    this.visibleFilter = !this.visibleFilter;
  }

  public onSearchValue() {
    this.searchSubject.next(this.searchValue);
  }

  public onSearchWordNSentence(value: string) {
    this.searchService.searchFn(this.queryParams, value, 'word');
  }

  public sortByDate() {
    this.searchService.sortByDate(this.queryParams);
  }

  public sortByCounts() {
    this.searchService.sortByCount(this.queryParams);
  }
}
