import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@ng/services';
import { LanguageCheckerComponent } from '@shared/components/language-checker/language-checker.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent
  extends LanguageCheckerComponent
  implements OnInit {
  @Input() sidebarVisible: boolean = false;
  @Output() sidebarVisibleChange = new EventEmitter();
  @Input() sidebarLock: boolean = false;
  @Output() sidebarLockChange = new EventEmitter();

  accountItems: MenuItem[] = [
    {
      label: 'خروج',
      icon: 'pi pi-sign-out',
      command: (event) => {
        this.utilsService.showConfirm(
          {
            header: 'خروج از سایت',
            message: 'آیا برای خروج اطمینان دارید؟',
            acceptLabel: 'بلی',
            rejectLabel: 'خیر'
          },
          this.vcRef
        ).then(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        });
      }
    }
  ];
  selectedLanguage = localStorage.getItem('lang');
  sideMenuItems: MenuItem[] = [
    {
      label: 'خانه',
      routerLink: '/',
      icon: 'pi pi-home'
    },
    {
      label: 'رستوران ها',
      routerLink: '/restaurants',
      icon: 'pi pi-home'
    }
  ];
  selectedTheme = 'saga-blue';
  themes = [
    {label: '01-arya-blue', value: 'arya-blue'},
    {label: '02-arya-green', value: 'arya-green'},
    {label: '03-arya-orange', value: 'arya-orange'},
    {label: '04-arya-purple', value: 'arya-purple'},
    {label: '05-bootstrap4-dark-blue', value: 'bootstrap4-dark-blue'},
    {label: '06-bootstrap4-dark-purple', value: 'bootstrap4-dark-purple'},
    {label: '07-bootstrap4-light-blue', value: 'bootstrap4-light-blue'},
    {label: '08-bootstrap4-light-purple', value: 'bootstrap4-light-purple'},
    {label: '09-fluent-light', value: 'fluent-light'},
    {label: '10-luna-amber', value: 'luna-amber'},
    {label: '11-luna-blue', value: 'luna-blue'},
    {label: '12-luna-green', value: 'luna-green'},
    {label: '13-luna-pink', value: 'luna-pink'},
    {label: '14-md-dark-deeppurple', value: 'md-dark-deeppurple'},
    {label: '15-md-dark-indigo', value: 'md-dark-indigo'},
    {label: '16-md-light-deeppurple', value: 'md-light-deeppurple'},
    {label: '17-md-light-indigo', value: 'md-light-indigo'},
    {label: '18-mdc-dark-deeppurple', value: 'md-dark-deeppurple'},
    {label: '19-mdc-dark-indigo', value: 'md-dark-indigo'},
    {label: '20-mdc-light-deeppurple', value: 'md-light-deeppurple'},
    {label: '21-mdc-light-indigo', value: 'md-light-indigo'},
    {label: '22-mira', value: 'mira'},
    {label: '23-nano', value: 'nano'},
    {label: '24-nova', value: 'nova'},
    {label: '25-nova-accent', value: 'nova-accent'},
    {label: '26-nova-alt', value: 'nova-alt'},
    {label: '27-rhea', value: 'rhea'},
    {label: '28-saga-blue', value: 'saga-blue'},
    {label: '29-saga-green', value: 'saga-green'},
    {label: '30-saga-orange', value: 'saga-orange'},
    {label: '31-saga-purple', value: 'saga-purple'},
    {label: '32-soho-dark', value: 'soho-dark'},
    {label: '33-soho-light', value: 'soho-light'},
    {label: '34-vela-blue', value: 'vela-blue'},
    {label: '35-vela-green', value: 'vela-green'},
    {label: '36-vela-orange', value: 'vela-orange'},
    {label: '37-vela-purple', value: 'vela-purple'},
    {label: '38-viva-dark', value: 'viva-dark'},
    {label: '39-viva-light', value: 'viva-light'}
  ];

  constructor(
    private router: Router,
    private vcRef: ViewContainerRef,
    private utilsService: UtilsService
  ) {
    super();
  }

  ngOnInit() {
    for (const item of this.sideMenuItems) {
      this.assignCloseFunc(item);
    }
  }

  assignCloseFunc(item: MenuItem) {
    if (item.routerLink) {
      Object.assign(item, {
        command: () => {
          if (!this.sidebarLock) {
            this.sidebarVisible = false;
          }
          this.sidebarVisibleChange.emit(this.sidebarVisible);
        }
      });
    }
    if (item.items) {
      for (const innerItem of item.items) {
        this.assignCloseFunc(innerItem);
      }
    }
  }

  changeTheme(event) {
    let themeElement = document.getElementById('theme-link');
    themeElement.setAttribute(
      'href',
      themeElement.getAttribute('href').replace(this.selectedTheme, event.value)
    );
    this.selectedTheme = event.value;
  }

  onLangChange(event) {
    this.translationService.use(event.value);
    this.selectedLanguage = event.value;
  }

  showSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  onSidebarVisibleChange(event) {
    this.sidebarVisible = event;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  onClickItem(event) {
    this.router.navigate([event.value]);
    if (!this.sidebarLock) this.sidebarVisible = false;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  onLockClick() {
    this.sidebarLock = !this.sidebarLock;
    if (this.sidebarLock) {
      document.querySelector('.p-sidebar-mask').classList.add('d-none');
      document.querySelector('body').classList.remove('p-overflow-hidden');
    }
    else {
      document.querySelector('.p-sidebar-mask').classList.remove('d-none');
      document.querySelector('body').classList.add('p-overflow-hidden');
    }
    this.sidebarLockChange.emit(this.sidebarLock);
  }
}
