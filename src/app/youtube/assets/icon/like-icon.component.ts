import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'like-icon',
  template: `<svg
    width="15"
    height="13"
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9615 0H10.9255C9.49399 0 8.22836 0.6825 7.5 1.69C6.77163 0.6825 5.50601 0 4.07452 0H4.03846C1.80649 0.0195 0 1.65425 0 3.6725C0 4.875 0.584135 6.58125 1.72356 7.98525C3.89423 10.66 7.5 13 7.5 13C7.5 13 11.1058 10.66 13.2764 7.98525C14.4159 6.58125 15 4.875 15 3.6725C15 1.65425 13.1935 0.0195 10.9615 0Z"
      fill="black"
    />
  </svg>`,
})
export class LikeIconComponent {
  fillColor = 'rgb(255, 0, 0)';
  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}