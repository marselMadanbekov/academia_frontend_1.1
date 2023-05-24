import { Component } from '@angular/core';
import {SidebarService} from "./service/sidebar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidebarOpen: boolean =false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  handleSidebarClosed() {
    this.sidebarService.toggle();
  }
}
