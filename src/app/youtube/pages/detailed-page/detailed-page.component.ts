import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { youtubeStore } from '../../../redux/youtube.store';
import { BorderColorService } from '../../services/border-color.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  imports: [NgStyle],
  providers: [BorderColorService, SearchService],
  templateUrl: './detailed-component.component.html',
  styleUrls: ['./detailed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedPageComponent implements OnInit {
  readonly store = inject(youtubeStore);

  public borderStyle: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderColorService: BorderColorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.store.setOneVideo(params['id']);

      this.borderStyle = this.borderColorService.handleSetColor(
        this.store.video()
      );
    });
  }

  public handleBack() {
    this.router.navigate(['/home']);
  }
}
