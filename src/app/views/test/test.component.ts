import { Component } from '@angular/core';
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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

}
