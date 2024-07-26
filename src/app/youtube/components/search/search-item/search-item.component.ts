import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommentIconComponent } from '../../../assets/icon/comment-icon.component';
import { DislikeIconComponent } from '../../../assets/icon/dislike-icon.component';
import { LikeIconComponent } from '../../../assets/icon/like-icon.component';
import { ViewedIconComponent } from '../../../assets/icon/viewed-icon.component';
import { SearchModel } from '../../../models/searchModel';
import { BorderColorService } from '../../../services/border-color.service';

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
  @Input() item!: SearchModel;
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
