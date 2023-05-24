import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";

@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss']
})
export class PupilsComponent {
  constructor(private sidebarService: SidebarService) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }
}
