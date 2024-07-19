import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-profile-icon',
  template: `<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 5C24 2.23858 21.7614 0 19 0H5C2.23858 0 0 2.23858 0 5V19C0 21.7614 2.23858 24 5 24H19C21.7614 24 24 21.7614 24 19V5ZM2.39993 12C2.39993 6.72 6.71993 2.4 11.9999 2.4C17.2799 2.4 21.5999 6.72 21.5999 12C21.5999 17.28 17.2799 21.6 11.9999 21.6C6.71993 21.6 2.39993 17.28 2.39993 12ZM14.8799 8.16C14.8799 6.57692 13.583 5.28 11.9999 5.28C10.4169 5.28 9.11993 6.57692 9.11993 8.16C9.11993 9.74307 10.4169 11.04 11.9999 11.04C13.583 11.04 14.8799 9.74307 14.8799 8.16ZM6.99188 14.7033C6.20027 15.3868 6.52028 16.5762 7.28858 17.2858C8.52571 18.4285 10.1806 19.1446 11.9999 19.1446C13.8176 19.1446 15.4711 18.4272 16.7078 17.2871C17.4783 16.5769 17.7993 15.3852 17.0055 14.7012C15.7911 13.6546 13.3984 13.0938 11.9999 13.0938C10.6005 13.0938 8.20552 13.6553 6.99188 14.7033Z"
      fill="#2F80ED"
    />
  </svg>`,
})
export class ProfileIconComponent {
  fillColor = 'rgb(255, 0, 0)';
  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}