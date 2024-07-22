import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  @Input() parentFn!: () => void;
  @Input() className!: string;

  onClickFn() {
    if (this.parentFn) {
      this.parentFn();
    }
  }
}
