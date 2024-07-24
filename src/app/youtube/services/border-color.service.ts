import { Injectable } from '@angular/core';

import { SearchModel } from '../models/searchModel';

@Injectable()
export class BorderColorService {
  borderStyle: Record<string, string> = {};

  handleSetColor(item: SearchModel) {
    const publishedDate = new Date(item.snippet.publishedAt);
    const today = new Date();
    const diffDate =
      new Date(publishedDate.getTime() - today.getTime()).getUTCDate() - 1;

    if (diffDate > 6 * 30) {
      this.borderStyle = { borderBottom: '3px solid #000000' };
    } else if (diffDate > 30 && diffDate < 6 * 30) {
      this.borderStyle = { borderBottom: '3px solid #FFFF00' };
    } else if (diffDate > 7 && diffDate < 30) {
      this.borderStyle = { borderBottom: '3px solid #00FF00' };
    } else {
      this.borderStyle = { borderBottom: '3px solid #0000FF' };
    }

    return this.borderStyle;
  }
}
