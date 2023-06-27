import {Component} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {User} from "../../models/User";
import {Mark} from "../../models/Mark";
import {TrenajerService} from "../../service/trenajer.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {TextToSpeechService} from "../../service/text-to-speech.service";
import {Group} from "../../models/Group";
import {UserService} from "../../service/entityServices/user.service";
import {MarkService} from "../../service/entityServices/mark.service";
import {GroupService} from "../../service/entityServices/group.service";
import {CRoleService} from "../../service/current/c-role.service";

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
  pdSelectedTask: string | null = null;
  pbSelectedTask: string | null = null;
  inter = 1;
  digits = 1;
  count = 3;

  //variables of size of components
  countOfPupils = 1;
  countFrames = [1, 2, 3, 4];
  countedWidth = 100;
  countedHeight = 90;

  firstFramePupil!: User;
  preFirstPupil!: User;
  secondFramePupil!: User;
  preSecondPupil!: User;
  thirdFramePupil!: User;
  preThirdPupil!: User;
  fourthFramePupil!: User;
  preFourthPupil!: User;

  firstPupilsMark = this.defaultMark(0);
  secondPupilsMark = this.defaultMark(0);
  thirdPupilsMark = this.defaultMark(0);
  fourthPupilsMark = this.defaultMark(0);


  firstFrameNum: any;
  firstFramePrev:any;
  secondFrameNum: any;
  secondFramePrev: any;
  thirdFrameNum: any;
  thirdFramePrev: any;
  fourthFrameNum: any;
  fourthFramePrev: any;
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
  fontSize = 20;
  voice = true;

  isPupil = false;
  defaultGroup = null;
  opened = false;

  constructor(private trenajer: TrenajerService,
              private roleService: CRoleService,
              private tokenService: TokenStorageService,
              private route: Router,
              private speechService: TextToSpeechService,
              private userService: UserService,
              private markService: MarkService,
              private groupService: GroupService,
  ) {
    this.groupService.getCurrentUsersGroups().subscribe(data => {
      this.groups = data;
    })
  }

  changeLanguage(lang: string) {
    this.lang = lang;
  }

  changeStatus(): boolean {
    this.opened = !this.opened;
    return this.opened;
  }

  resetMarks(): void {
    this.firstPupilsMark = this.defaultMark(0);
    this.secondPupilsMark = this.defaultMark(0);
    this.thirdPupilsMark = this.defaultMark(0);
    this.fourthPupilsMark = this.defaultMark(0);
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

  defaultMark(userId: number): { createdDate: Date; total_questions: number; subject: { id: number }; correct_answers: number; topic: string; userId: number } {
    return {
      userId:userId,
      subject:{id:1},
      correct_answers: 0,
      total_questions: 0,
      topic: this.selectedTaskName(),
      createdDate: new Date(),
    }
  }

  defaultUser(): User {
    return {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      role: '',
      age: 0,
    }
  }

  ngOnInit() {
    this.roleService.currentRole$.subscribe(role => {
      if (role === 'ROLE_PUPIL' || role === 'ROLE_BRANCH_OWNER' || role === 'ROLE_SUPER_ADMIN') {
        this.isPupil = true;
      }
    })
    this.userService.getCurrentUsersPupils().subscribe(data => {
      this.pupils = data;
    }, error => {
      console.log(error);
    })
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
    this.firstFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    if (this.countOfPupils > 1) this.secondFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    if (this.countOfPupils > 2) this.thirdFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
    if (this.countOfPupils > 3) this.fourthFrameArray = await this.trenajer.getArray(this.selectedTaskName(), this.digits, this.count);
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
          if(this.firstFrameArray[i] == this.firstFramePrev){
            this.firstFrameNum = "  " + this.firstFrameArray[i];
            this.firstFramePrev = null;
          }else {
            this.firstFrameNum = this.firstFrameArray[i];
            this.firstFramePrev = this.firstFrameArray[i];
          }
          console.log(this.voice);
          if (this.voice) this.speechService.speakNumber(this.firstFrameNum);
          if (this.countOfPupils > 1) {
            if(this.secondFrameArray[i] == this.secondFramePrev){
              this.secondFrameNum = "  " + this.secondFrameArray[i];
              this.secondFramePrev = null;
            }else {
              this.secondFrameNum = this.secondFrameArray[i];
              this.secondFramePrev = this.secondFrameArray[i];
            }
          }
          if (this.countOfPupils > 2) {
            if(this.thirdFrameArray[i] == this.thirdFramePrev){
              this.thirdFrameNum = "  " + this.thirdFrameArray[i];
              this.thirdFramePrev = null;
            }else {
              this.thirdFrameNum = this.thirdFrameArray[i];
              this.thirdFramePrev = this.thirdFrameArray[i];
            }
          }
          if (this.countOfPupils > 3) {
            if(this.fourthFrameArray[i] == this.fourthFramePrev){
              this.fourthFrameNum = "  " + this.fourthFrameArray[i];
              this.fourthFramePrev = null;
            }else {
              this.fourthFrameNum = this.fourthFrameArray[i];
              this.fourthFramePrev = this.fourthFrameArray[i];
            }
          }
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
    } catch (error) {
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
        this.firstPupilsMark.total_questions++;
        this.firstPupilsMark.correct_answers++;
        this.firstFrameCheckers = false;
        console.log("this is a first frame")
        console.log(this.firstPupilsMark);
        break;
      case 2:
        this.secondPupilsMark.total_questions++;
        this.secondPupilsMark.correct_answers++;
        console.log('this is a second frame');
        console.log(this.secondPupilsMark);
        this.secondFrameCheckers = false;
        break;
      case 3:
        this.thirdPupilsMark.total_questions++;
        this.thirdPupilsMark.correct_answers++;
        console.log('this is a third frame');
        console.log(this.thirdPupilsMark);
        this.thirdFrameCheckers = false;
        break;
      case 4:
        this.fourthPupilsMark.total_questions++;
        this.fourthPupilsMark.correct_answers++;
        console.log('this is a fourth frame');
        console.log(this.fourthPupilsMark);
        this.fourthFrameCheckers = false;
        break;
      default:
        break;
    }
  }

  answer() {
    if (this.voice) this.speechService.speakNumber(this.firstFrameArray[this.count]);
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
        this.firstPupilsMark.total_questions++;
        this.firstFrameCheckers = false;
        console.log('this is a first frame');
        console.log(this.firstPupilsMark);
        break;
      case 2:
        this.secondPupilsMark.total_questions++;
        console.log('this is a second frame');
        console.log(this.secondPupilsMark);
        this.secondFrameCheckers = false;
        break;
      case 3:
        this.thirdPupilsMark.total_questions++;
        console.log('this is a third frame');
        console.log(this.thirdPupilsMark);
        this.thirdFrameCheckers = false;
        break;
      case 4:
        this.fourthPupilsMark.total_questions++;
        console.log('this is a fourth frame');
        console.log(this.fourthPupilsMark);
        this.fourthFrameCheckers = false;
        break;
      default:
        break;
    }
  }


  pupilChanged(frameNum: number) {
    switch (frameNum) {
      case 1:
        console.log(this.firstPupilsMark);
        this.uploadMark(this.firstPupilsMark);
        console.log('this is a first frame');
        this.firstPupilsMark = this.defaultMark(this.firstFramePupil.id);

        break;
      case 2:
        this.uploadMark(this.secondPupilsMark);
        console.log('this is a second frame');
        this.secondPupilsMark = this.defaultMark(this.secondFramePupil.id);
        break;
      case 3:
        this.uploadMark(this.thirdPupilsMark);
        console.log('this is a third frame');
        this.thirdPupilsMark = this.defaultMark(this.thirdFramePupil.id);
        break;
      case 4:
        this.uploadMark(this.fourthPupilsMark);
        console.log('this is a fourth frame');
        this.fourthPupilsMark = this.defaultMark(this.fourthFramePupil.id);
        break;
      default:
        break;
    }
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
      if (this.digits === 1) this.fontSize = 20;
      else
        this.fontSize = 25 - this.digits * 2;
    }
  }

  save() {
    this.uploadMark(this.firstPupilsMark);
    this.firstPupilsMark = this.defaultMark(this.firstFramePupil.id);

    this.uploadMark(this.secondPupilsMark);
    this.secondPupilsMark = this.defaultMark(this.secondFramePupil.id);

    this.uploadMark(this.thirdPupilsMark);
    this.thirdPupilsMark = this.defaultMark(this.thirdFramePupil.id);

    this.uploadMark(this.fourthPupilsMark);
    this.fourthPupilsMark = this.defaultMark(this.fourthFramePupil.id);
  }

  uploadMark(mark: { createdDate: Date; total_questions: number; subject: { id: number }; correct_answers: number; topic: string; userId: number }): void {
    if (mark.total_questions != 0 && mark.userId != 0) {
      this.markService.createMark({
        total_questions: mark.total_questions,
        correct_answers: mark.correct_answers,
        userId: mark.userId,
        subject: {id: 1},
        topic: mark.topic
      }).subscribe(data => {
        console.log(data);
      })
    }
  }

  onGroupChange() {
    if (this.selectedGroup) {
      this.userService.getPupilsByGroup(this.selectedGroup.id).subscribe(data => {
        this.pupils = data;
      });
    } else {
      this.userService.getCurrentUsersPupils().subscribe(data => {
        this.pupils = data;
      });
    }
  }

  logout() {
    this.tokenService.logOut();
    this.route.navigate(['/login'])
  }
}
