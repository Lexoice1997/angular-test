import { Component } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
