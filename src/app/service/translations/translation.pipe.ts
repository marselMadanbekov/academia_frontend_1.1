import { Pipe, PipeTransform } from '@angular/core';
import {TranslationService} from "./translation.service";

@Pipe({
  name: 'translationPipe'
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(key: string, lang: string): string {
    return this.translationService.translate(key, lang);
  }
}
