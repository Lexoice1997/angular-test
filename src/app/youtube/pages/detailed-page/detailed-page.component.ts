import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NgStyle } from '@angular/common';
import data from '../../../data.json';
import { ResultModel } from '../../models/resultModel';
import { BorderColorService } from '../../services/border-color.service';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  imports: [NgStyle],
  providers: [BorderColorService],
  templateUrl: './detailed-component.component.html',
  styleUrls: ['./detailed-page.component.scss'],
})
export class DetailedPageComponent implements OnInit {
  item!: ResultModel;
  borderStyle: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderColorService: BorderColorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.item = data.items.filter((item) => item.id === params['id'])[0];
      this.borderStyle = this.borderColorService.handleSetColor(this.item);
    });
  }

  handleBack() {
    this.router.navigate(['/home']);
  }
}
