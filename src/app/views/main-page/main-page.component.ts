import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/entityServices/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  currentLang!: string;
  ngOnInit(): void {
    this.userService.getRole().subscribe(data =>{
      if(data === "ROLE_PUPIL" || data === "ROLE_TEACHER"){
        this.router.navigate(["main-user"]);
      }else{
        this.router.navigate(["main-admin"]);
      }
    })
  }


  constructor(private userService: UserService,
              private router: Router) {
  }
}
