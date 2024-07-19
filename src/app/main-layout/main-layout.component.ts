import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { SearchResultsComponent } from '../search/search-results/search-results.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [HeaderComponent, SearchResultsComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  searchValue: string = ""

  changeSearchValue(value: string) {
    this.searchValue = value
  }
  
}
