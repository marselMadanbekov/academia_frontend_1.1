import {Component} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {User} from "../../models/User";
import {Mark} from "../../models/Mark";
import {TrenajerService} from "../../service/trenajer.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {TextToSpeechService} from "../../service/text-to-speech.service";
import {Group} from "../../models/Group";

export interface Task {
  name: string;
}

const pomoshBrata: Task[] = [
  {name: '+1'},
  {name: '-1'},
  {name: '+2'},
  {name: '-2'},
  {name: '+3'},
  {name: '-3'},
  {name: '+4'},
  {name: '-4'},
];
const pomoshDruga: Task[] = [
  {name: '+1'},
  {name: '-1'},
  {name: '+2'},
  {name: '-2'},
  {name: '+3'},
  {name: '-3'},
  {name: '+4'},
  {name: '-4'},
  {name: '+5'},
  {name: '-5'},
  {name: '+6'},
  {name: '-6'},
  {name: '+7'},
  {name: '-7'},
  {name: '+8'},
  {name: '-8'},
  {name: '+9'},
  {name: '-9'},
];

@Component({
  selector: 'app-trenajer',
  templateUrl: './trenajer.component.html',
  styleUrls: ['./trenajer.component.scss']
})
export class TrenajerComponent {
  lang = 'kg';

  groups!: Group[];
  selectedGroup!: Group;
  pupils!: User[];
  //common variables
  pbSelectInfo = pomoshBrata;
  pdSelectInfo = pomoshDruga;
  pdSelectedTask: any;
  pbSelectedTask: any;
  inter = 1;
  digits = 1;
  count = 3;

  //variables of size of components
  countOfPupils = 1;
  countFrames = [1, 2, 3, 4];
  countedWidth = 100;
  countedHeight = 95;

  firstFramePupil!: User;
  preFirstPupil!: User;
  secondFramePupil!: User;
  preSecondPupil!: User;
  thirdFramePupil!: User;
  preThirdPupil!: User;
  fourthFramePupil!: User;
  preFourthPupil!: User;

  firstPupilsMark = this.defaultMark();
  secondPupilsMark = this.defaultMark();
  thirdPupilsMark = this.defaultMark();
  fourthPupilsMark = this.defaultMark();


  firstFrameNum: any;
  secondFrameNum: any;
  thirdFrameNum: any;
  fourthFrameNum: any;
  firstFrameArray!: any[];
  secondFrameArray!: any[];
  thirdFrameArray!: any[];
  fourthFrameArray!: any[];
  source = interval(this.inter);
  subscription!: Subscription;

  firstFrameCheckers = false;
  secondFrameCheckers = false;
  thirdFrameCheckers = false;
  fourthFrameCheckers = false;

  startButtonEnable = true;
  showAnswerEnable = false;
  fontSize = 30;
  voice = true;

  isPupil = false;
  defaultGroup = null;
  opened = false;

  constructor(private trenajer: TrenajerService,
              private tokenService: TokenStorageService,
              private route: Router,
              private speechService: TextToSpeechService,
              // private userService: UserService,
              // private markService: MarkService,
              // private groupService: GroupService,
  ) {
    // this.groupService.getCurrentUsersGroups().subscribe(data =>{
    //   this.groups = data;
    // })
    // this.userService.getRole().subscribe(data =>{
    //   console.log(data);
    //   this.isPupil = (data == 'ROLE_PUPIL');
    //   console.log(this.isPupil);
    // })
  }
  changeLanguage(lang: string) {
    this.lang = lang;
  }

  changeStatus():boolean{
    this.opened = !this.opened;
    return this.opened;
  }
  resetMarks():void{
    this.firstPupilsMark = this.defaultMark();
    this.secondPupilsMark = this.defaultMark();
    this.thirdPupilsMark = this.defaultMark();
    this.fourthPupilsMark = this.defaultMark();
  }

  resetAll(): void {
    this.viewReset();
    this.resetMarks();

    this.firstFramePupil = this.defaultUser();
    this.preFirstPupil = this.defaultUser();
    this.secondFramePupil = this.defaultUser();
    this.preSecondPupil = this.defaultUser();
    this.thirdFramePupil = this.defaultUser();
    this.preThirdPupil = this.defaultUser();
    this.fourthFramePupil = this.defaultUser();
    this.preFourthPupil = this.defaultUser();
  }

  viewReset(): void {
    this.firstFrameCheckers = false;
    this.secondFrameCheckers = false;
    this.thirdFrameCheckers = false;
    this.fourthFrameCheckers = false;
    this.startButtonEnable = true;
    this.showAnswerEnable = false;

    this.firstFrameNum = null;
    this.secondFrameNum = null;
    this.thirdFrameNum = null;
    this.fourthFrameNum = null;
  }

  defaultMark(): Mark {
    return {
      correctAnswers: 0,
      totalQuestions: 0,
      topic: this.selectedTaskName(),
      date: new Date(),
    }
  }

  defaultUser(): User {
    return {
      id:0,
      username: '',
      firstname: '',
      lastname: '',
      role: '',
      age: 0,
    }
  }

  ngOnInit() {
    // this.userService.getRole().subscribe(data =>{
    //   if(data === "ROLE_PUPIL"){
    //     this.isPupil = true;
    //   }
    // });
    // this.userService.getAllPupils().subscribe(data => {
    //   this.pupils = data;
    // });
  }


  pbSelected() {
    this.pdSelectedTask = null;
    this.save();
    this.resetMarks();
  }

  pdSelected() {
    this.pbSelectedTask = null;
    this.save();
    this.resetMarks();
  }

  async getTasks(): Promise<any> {
    // this.firstFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    // if (this.countOfPupils > 1) this.secondFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    // if (this.countOfPupils > 2) this.thirdFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    // if (this.countOfPupils > 3) this.fourthFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
  }

  selectedTaskName(): string {
    if (this.pbSelectedTask) {
      console.log("PB" + this.pbSelectedTask);
      return "PB" + this.pbSelectedTask;
    } else if (this.pdSelectedTask) {
      console.log("PD" + this.pdSelectedTask);
      return "PD" + this.pdSelectedTask;
    } else return "default";
  }

  start(): void {
    try {
      this.source = interval(this.inter * 1000);
      this.getTasks();

      console.log(this.firstFrameArray);
      console.log(this.secondFrameArray);

      this.firstFrameCheckers = false;
      this.secondFrameCheckers = false;
      this.thirdFrameCheckers = false;
      this.fourthFrameCheckers = false;

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      let i = 0;

      this.subscription = this.source.subscribe(() => {
        if (i < this.count) {
          this.firstFrameNum = this.firstFrameArray[i];
          console.log(this.voice);
          // if (this.voice) this.speechService.speakNumber(this.firstFrameNum);
          if (this.countOfPupils > 1) this.secondFrameNum = this.secondFrameArray[i];
          if (this.countOfPupils > 2) this.thirdFrameNum = this.thirdFrameArray[i];
          if (this.countOfPupils > 3) this.fourthFrameNum = this.fourthFrameArray[i];
          this.startButtonEnable = false;
        }
        if (i == this.count + 1) {
          this.firstFrameNum = '=?';
          this.secondFrameNum = '=?';
          this.thirdFrameNum = '=?';
          this.fourthFrameNum = '=?';

          this.subscription.unsubscribe();
          this.showAnswerEnable = true;
          this.startButtonEnable = false;
        }
        console.log(this.firstFrameArray);
        i += 1;
        console.log(i);
      });
    }catch (error){
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.resetAll();
    }
  }


  correct(frameNum: number) {
    this.showAnswerEnable = false;
    this.startButtonEnable = true;


    switch (frameNum) {
      case 1:
        this.firstPupilsMark.totalQuestions++;
        this.firstPupilsMark.correctAnswers++;
        this.firstFrameCheckers = false;
        console.log("this is a first frame")
        console.log(this.firstPupilsMark);
        break;
      case 2:
        this.secondPupilsMark.totalQuestions++;
        this.secondPupilsMark.correctAnswers++;
        console.log('this is a second frame');
        console.log(this.secondPupilsMark);
        this.secondFrameCheckers = false;
        break;
      case 3:
        this.thirdPupilsMark.totalQuestions++;
        this.thirdPupilsMark.correctAnswers++;
        console.log('this is a third frame');
        console.log(this.thirdPupilsMark);
        this.thirdFrameCheckers = false;
        break;
      case 4:
        this.fourthPupilsMark.totalQuestions++;
        this.fourthPupilsMark.correctAnswers++;
        console.log('this is a fourth frame');
        console.log(this.fourthPupilsMark);
        this.fourthFrameCheckers = false;
        break;
      default:
        break;
    }
  }

  answer() {
    // if (this.voice) this.speechService.speakNumber(this.firstFrameArray[this.count]);
    this.firstFrameNum = '=' + this.firstFrameArray[this.count];
    if (this.countOfPupils > 1) this.secondFrameNum = '=' + this.secondFrameArray[this.count];
    if (this.countOfPupils > 2) this.thirdFrameNum = '=' + this.thirdFrameArray[this.count];
    if (this.countOfPupils > 3) this.fourthFrameNum = '=' + this.fourthFrameArray[this.count];
    this.showAnswerEnable = false;
    this.startButtonEnable = true;

    this.firstFrameCheckers = true;
    this.secondFrameCheckers = true;
    this.thirdFrameCheckers = true;
    this.fourthFrameCheckers = true;

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  incorrect(frameNum: number) {
    this.showAnswerEnable = false;
    this.startButtonEnable = true;
    this.startButtonEnable = true;

    switch (frameNum) {
      case 1:
        this.firstPupilsMark.totalQuestions++;
        this.firstFrameCheckers = false;
        console.log('this is a first frame');
        console.log(this.firstPupilsMark);
        break;
      case 2:
        this.secondPupilsMark.totalQuestions++;
        console.log('this is a second frame');
        console.log(this.secondPupilsMark);
        this.secondFrameCheckers = false;
        break;
      case 3:
        this.thirdPupilsMark.totalQuestions++;
        console.log('this is a third frame');
        console.log(this.thirdPupilsMark);
        this.thirdFrameCheckers = false;
        break;
      case 4:
        this.fourthPupilsMark.totalQuestions++;
        console.log('this is a fourth frame');
        console.log(this.fourthPupilsMark);
        this.fourthFrameCheckers = false;
        break;
      default:
        break;
    }
  }


  pupilChanged(frameNum: number) {
    // switch (frameNum) {
    //   case 1:
    //     this.uploadMark(this.firstPupilsMark, this.preFirstPupil);
    //     console.log('this is a first frame');
    //     this.preFirstPupil = this.firstFramePupil;
    //     this.firstPupilsMark = this.defaultMark();
    //     break;
    //   case 2:
    //     this.uploadMark(this.secondPupilsMark, this.preSecondPupil);
    //     console.log('this is a second frame');
    //     this.preSecondPupil = this.secondFramePupil;
    //     this.secondPupilsMark = this.defaultMark();
    //     break;
    //   case 3:
    //     this.uploadMark(this.thirdPupilsMark, this.preThirdPupil);
    //     console.log('this is a third frame');
    //     this.preThirdPupil = this.thirdFramePupil;
    //     this.thirdPupilsMark = this.defaultMark();
    //     break;
    //   case 4:
    //     this.uploadMark(this.fourthPupilsMark, this.preFourthPupil);
    //     console.log('this is a fourth frame');
    //     this.preFourthPupil = this.fourthFramePupil;
    //     this.fourthPupilsMark = this.defaultMark();
    //     break;
    //   default:
    //     break;
    // }
  }

  countOfPupilChange() {
    this.voice = this.countOfPupils === 1;
    this.digitsChange();
    this.resetAll();
  }

  break() {
    this.subscription.unsubscribe();
    this.viewReset();
  }

  digitsChange() {
    if (this.countOfPupils < 3) {
      this.countedWidth = (this.countOfPupils === 2) ? 45 : 100;
      this.countedHeight = 90;
      this.fontSize = 30 - this.digits * 2;
    } else {
      this.countedHeight = 45;
      this.countedWidth = 45;
      if(this.digits === 1) this.fontSize = 20;
      else
        this.fontSize = 25 - this.digits * 2;
    }
  }

  save() {
    // this.uploadMark(this.firstPupilsMark, this.firstFramePupil);
    // this.firstPupilsMark = this.defaultMark();
    //
    // this.uploadMark(this.secondPupilsMark, this.secondFramePupil);
    // this.secondPupilsMark = this.defaultMark();
    //
    // this.uploadMark(this.thirdPupilsMark, this.thirdFramePupil);
    // this.thirdPupilsMark = this.defaultMark();
    //
    // this.uploadMark(this.fourthPupilsMark, this.fourthFramePupil);
    // this.fourthPupilsMark = this.defaultMark();
  }

  // uploadMark(mark: Mark, user: User): void {
  //   if (mark.totalQuestions != 0 && user.firstname != '') {
  //     console.log(user.username);
  //     this.markService.setMark(mark, user.username).subscribe(data => {
  //       console.log(data);
  //     })
  //   }
  // }
  //
  // onGroupChange() {
  //   if(this.selectedGroup){
  //     this.userService.getMembersOfGroup(this.selectedGroup.id).subscribe(data =>{
  //       this.pupils = data;
  //     });
  //   }else{
  //     this.userService.getAllPupils().subscribe(data =>{
  //       this.pupils = data;
  //     });
  //   }
  // }

  logout() {
    this.tokenService.logOut();
    this.route.navigate(['/login'])
  }

  main() {
    this.route.navigate(['main']);
  }
}
