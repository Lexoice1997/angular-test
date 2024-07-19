import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';

import { CommentIconComponent } from '../icon/comment-icon.component';
import { DislikeIconComponent } from '../icon/dislike-icon.component';
import { LikeIconComponent } from '../icon/like-icon.component';
import { ViewedIconComponent } from '../icon/viewed-icon.component';
import { ResultModel } from '../types/resultModel';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    NgStyle,
    DislikeIconComponent,
    ViewedIconComponent,
    LikeIconComponent,
    CommentIconComponent,
  ],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements AfterViewInit {
  @Input() item!: ResultModel;
  borderStyle = {};

  ngAfterViewInit(): void {
    const publishedDate = new Date(this.item.snippet.publishedAt);
    const today = new Date();
    const diffDate =
      new Date(publishedDate.getTime() - today.getTime()).getUTCDate() - 1;

    if (diffDate > 6 * 30) {
      this.borderStyle = { 'border-color': 'red' };
    } else if (diffDate > 30 && diffDate < 6 * 30) {
      this.borderStyle = { 'border-color': 'yellow' };
    } else if (diffDate > 7 && diffDate < 30) {
      this.borderStyle = { 'border-color': 'green' };
    } else {
      this.borderStyle = { 'border-color': 'blue' };
    }
  }
}
