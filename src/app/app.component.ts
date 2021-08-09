import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'storeapp';
  categoriesSideNavOpened: boolean = false;
  cartSideNavOpened: boolean = false;
}
