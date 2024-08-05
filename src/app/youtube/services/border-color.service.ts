import { Injectable, signal } from '@angular/core';

import { VideoModel } from '../models/videoModel';

@Injectable()
export class BorderColorService {
  public borderStyle = signal<Record<string, string>>({});

  public handleSetColor(item: VideoModel) {
    const publishedDate = new Date(item.snippet.publishedAt);
    const today = new Date();
    const diffDate =
      new Date(publishedDate.getTime() - today.getTime()).getUTCDate() - 1;

    if (diffDate > 6 * 30) {
      this.borderStyle.set({ borderBottom: '3px solid #000000' });
    } else if (diffDate > 30 && diffDate < 6 * 30) {
      this.borderStyle.set({ borderBottom: '3px solid #FFFF00' });
    } else if (diffDate > 7 && diffDate < 30) {
      this.borderStyle.set({ borderBottom: '3px solid #00FF00' });
    } else {
      this.borderStyle.set({ borderBottom: '3px solid #0000FF' });
    }

    return this.borderStyle();
  }
}
