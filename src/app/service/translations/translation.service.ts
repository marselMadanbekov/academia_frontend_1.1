import {Injectable, OnInit} from '@angular/core';
import translations from '../../../assets/translations.json'

interface Translations {
  [lang: string]: {
    [key: string]: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit{

  constructor() {}

  ngOnInit():void{
  }

  translate(key: string, lang: string): string {
    const translation: Translations = translations;
    return translation[lang][key];
  }
}
