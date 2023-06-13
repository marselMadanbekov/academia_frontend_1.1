import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {CRoleService} from "../../service/current/c-role.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  lang = 'ru';
  showProgressBar: boolean = false;
  hide = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private roleService: CRoleService,
    private fb: FormBuilder,) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showProgressBar = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.showProgressBar = false;
      }
    });
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.showProgressBar = true;
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);

      this.roleService.setCurrentRole(data.role);
      if(data.role === 'ROLE_PUPIL' || data.role === "ROLE_TEACHER")
        this.router.navigate(['main-user'])
      else
        this.router.navigate(['main']);
      this.notificationService.showSnackBar('Successfully logged in');
    }, error => {
      if(error.status == 401){
        this.notificationService.showSnackBar(error);
      }
      this.showProgressBar = false;
      this.router.navigate(['login']);
    });
  }
}
