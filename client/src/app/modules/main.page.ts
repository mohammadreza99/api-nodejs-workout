import { Component, OnInit } from '@angular/core';
import { LanguageCheckerComponent } from '@shared/components/language-checker/language-checker.component';

@Component({
  selector: 'main-page',
  styleUrls: ['main.page.scss'],
  templateUrl: './main.page.html'
})
export class MainPage extends LanguageCheckerComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  sidebarVisible = false;
  sidebarLock = false;
}
