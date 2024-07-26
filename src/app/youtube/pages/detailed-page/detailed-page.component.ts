import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SearchModel } from '../../models/searchModel';
import { BorderColorService } from '../../services/border-color.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  imports: [NgStyle],
  providers: [BorderColorService, SearchService],
  templateUrl: './detailed-component.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent implements OnInit {
  public item: SearchModel = {
    etag: '',
    id: { kind: '', videoId: '' },
    kind: '',
    snippet: {
      publishedAt: '',
      channelId: '',
      title: '',
      description: '',
      thumbnails: {
        high: { url: '', width: 0, height: 0 },
      },
      channelTitle: '',
      tags: [],
      categoryId: '',
      liveBroadcastContent: '',
      localized: {
        title: '',
        description: '',
      },
      defaultAudioLanguage: '',
    },
  };
  public borderStyle: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderColorService: BorderColorService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.searchService
        .getOneVideo(params['id'])
        .subscribe((data) => (this.item = data.items[0]));
      this.borderStyle = this.borderColorService.handleSetColor(this.item);
    });
  }

  public handleBack() {
    this.router.navigate(['/home']);
  }
}
