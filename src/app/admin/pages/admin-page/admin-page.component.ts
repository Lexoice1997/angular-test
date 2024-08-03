import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { youtubeStore } from '../../../redux/youtube.store';
import { notBeFutureDateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  readonly store = inject(youtubeStore);
  private formBuilder = inject(FormBuilder);
  cardForm: FormGroup;

  constructor() {
    this.cardForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      description: ['', [Validators.maxLength(20)]],
      img: ['', [Validators.required]],
      linkVideo: ['', [Validators.required]],
      creationDate: ['', [Validators.required, notBeFutureDateValidator()]],
      tags: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required]),
      ]),
    });
  }

  get tags() {
    return this.cardForm.get('tags') as FormArray;
  }

  get title() {
    return this.cardForm.get('title');
  }

  get description() {
    return this.cardForm.get('description');
  }

  get img() {
    return this.cardForm.get('img');
  }

  get linkVideo() {
    return this.cardForm.get('linkVideo');
  }

  get creationDate() {
    return this.cardForm.get('creationDate');
  }

  private createTag() {
    return this.formBuilder.control('', [Validators.required]);
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  removeTag(index: number) {
    if (!(this.tags.length <= 1)) {
      this.tags.removeAt(index);
    }
  }

  onReset() {
    this.cardForm.reset();
  }

  onSubmit() {
    this.store.addVideo({
      etag: '',
      id: uuidv4(),
      kind: '',
      isFavorite: false,
      snippet: {
        publishedAt: this.cardForm.value.creationDate,
        channelId: '',
        title: this.cardForm.value.title,
        description: this.cardForm.value.description,
        thumbnails: {
          high: { url: this.cardForm.value.img, width: 100, height: 100 },
        },
        channelTitle: '',
        tags: this.cardForm.value.tags,
        categoryId: '',
        liveBroadcastContent: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
    });
  }
}
