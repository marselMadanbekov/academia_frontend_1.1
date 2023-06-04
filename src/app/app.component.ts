import { Component, OnInit } from '@angular/core';
import { SidebarService } from "./service/sidebar.service";
import { UserService } from "./service/entityServices/user.service";
import { CRoleService } from "./service/current/c-role.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isLoad = false;
  isShowAdminButtons = false;
  role!: string;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    private roleService: CRoleService
  ) {}

  ngOnInit(): void {
    this.userService.getRole().subscribe(data => {
      this.role = data;
      console.log(data);
      this.checkAdminButtonsVisibility();
      this.isLoad = true;
    });

    this.sidebarService.isSidebarOpen$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    this.roleService.currentRole$.subscribe((role) => {
      this.role = role;
      console.log(role);
      this.checkAdminButtonsVisibility();
    });
  }

  checkAdminButtonsVisibility(): void {
    if (this.role === 'ROLE_PUPIL' || this.role === 'ROLE_TEACHER' || this.role === 'ROLE_ADMIN') {
      this.isShowAdminButtons = true;
    } else {
      this.isShowAdminButtons = false;
    }
  }

  handleSidebarClosed() {
    this.sidebarService.toggle();
    this.checkAdminButtonsVisibility();
    console.log('toggle ' + this.role);
    console.log(this.isShowAdminButtons);
  }
}
