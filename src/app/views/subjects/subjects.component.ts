import { Component } from '@angular/core';
import {SidebarService} from "../../service/sidebar.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {
  constructor(private sidebarService: SidebarService) {
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }
}
