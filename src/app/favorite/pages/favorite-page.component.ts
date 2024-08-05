import { Component, inject } from '@angular/core';

import { youtubeStore } from '../../redux/youtube.store';
import { SearchItemComponent } from '../../youtube/components/search/search-item/search-item.component';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [SearchItemComponent],
  providers: [],
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent {
  readonly store = inject(youtubeStore);
}
