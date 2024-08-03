import { NgStyle } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CommentIconComponent } from '../../../assets/icon/comment-icon.component';
import { DislikeIconComponent } from '../../../assets/icon/dislike-icon.component';
import { LikeIconComponent } from '../../../assets/icon/like-icon.component';
import { ViewedIconComponent } from '../../../assets/icon/viewed-icon.component';
import { VideoModel } from '../../../models/videoModel';
import { BorderColorService } from '../../../services/border-color.service';
import { youtubeStore } from '../../../../redux/youtube.store';

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
  providers: [BorderColorService],
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  readonly store = inject(youtubeStore)
  @Input() item!: VideoModel;
  public borderStyle = {};

  constructor(
    private router: Router,
    private borderColorService: BorderColorService
  ) {}

  ngOnInit(): void {
    this.borderStyle = this.borderColorService.handleSetColor(this.item);
  }

  public onNavigate() {
    this.router.navigate(['home', this.item.id]);
  }
}
