import {Component} from '@angular/core';
import {Global} from '@ng/global';
import {TranslationService} from '@core/utils';

@Component({
  selector: 'language-checker',
  template: ``,
})
export class LanguageCheckerComponent {
  constructor() {
    this.translationService = Global.Injector.get(TranslationService);
    this.translationService.getCurrentLang().subscribe((lang: string) => {
      this.activeLang = lang;
      this.translationService.setDefaultLang(this.activeLang);
      const body = document.querySelector('body');
      if (this.fa) {
        body.style.direction = 'rtl';
        body.classList.add('ng-rtl');
        body.classList.remove('ng-ltr');
      } else if (this.en) {
        body.style.direction = 'ltr';
        body.classList.add('ng-ltr');
        body.classList.remove('ng-rtl');
      }
    });
  }

  activeLang: string;
  translationService: TranslationService;

  get en(): boolean {
    return this.activeLang === 'en';
  }

  get fa(): boolean {
    return this.activeLang === 'fa';
  }
}
