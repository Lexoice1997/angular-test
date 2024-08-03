import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { youtubeStore } from '../../../redux/youtube.store';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  readonly store = inject(youtubeStore);
  itemsCount = input<number>(0);
  pages$ = computed(() => {
    let result = [];
    for (let i = 1; i <= Math.ceil(this.itemsCount() / 20); i++) {
      result.push(i);
    }
    return result;
  });

  constructor(private router: Router) {}

  onChangePage(value: number) {
    this.store.setPage(value);
  }
}
