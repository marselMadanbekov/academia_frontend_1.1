import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  speechSynthesis: any;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  speakNumber(number: number) {
    const russianNumber = number.toLocaleString('ru-RU');
    const utterance = new SpeechSynthesisUtterance(russianNumber);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.3;
    this.speechSynthesis.speak(utterance);
  }
}
