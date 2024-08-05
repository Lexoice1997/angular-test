import { NgClass } from '@angular/common';
import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [NgClass],
  providers: [],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  parentFn = input<() => void>();
  className = input<string>('');

  onClickFn() {
    if (this.parentFn) {
      this.parentFn();
    }
  }
}
