import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmPopupComponent } from '@ng/components/confirm-popup/confirm-popup.component';
import { ConfirmComponent } from '@ng/components/confirm/confirm.component';
import { DialogFormComponent } from '@ng/components/dialog-form/dialog-form.component';
import { MessageComponent } from '@ng/components/message/message.component';
import { ToastComponent } from '@ng/components/toast/toast.component';
import {
  NgConfirmOptions,
  NgConfirmPopupOptions,
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgMessage,
  NgMessageOptions,
  NgToastOptions,
} from '@ng/models/overlay';
import {
  ConfirmationService,
  FilterService,
  MessageService,
} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { NumberToPersianWord } from './num-to-per-word';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private resolver: ComponentFactoryResolver,
    private filterService: FilterService,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  //////////////////////////////////////////////////////////////////////////
  //                              MESSAGE                                 //
  //////////////////////////////////////////////////////////////////////////
  private messageCmp: ComponentRef<MessageComponent>;
  showMessage(
    message: NgMessage[] | NgMessage,
    vcRef: ViewContainerRef,
    options?: NgMessageOptions
  ) {
    vcRef.clear();
    let factory = this.resolver.resolveComponentFactory(MessageComponent);
    this.messageCmp = vcRef.createComponent(factory);
    document
      .querySelector(vcRef['_lContainer'][0][0].localName)
      .prepend(vcRef.element.nativeElement.nextSibling);
    Object.assign(this.messageCmp.instance.options, options);
    this.messageCmp.instance.show(message);
  }

  clearMessages() {
    this.messageCmp.instance.messages = [];
  }

  successfullMessage(vcRef: ViewContainerRef): void {
    return this.showMessage(
      {
        summary: 'عملیات با موفقیت انجام شد.',
        detail: 'success',
        severity: 'success',
      },
      vcRef
    );
  }

  //////////////////////////////////////////////////////////////////////////
  //                                TOAST                                 //
  //////////////////////////////////////////////////////////////////////////
  showToast(
    message: NgMessage,
    vcRef: ViewContainerRef,
    options?: NgToastOptions
  ) {
    let cmp: ComponentRef<ToastComponent>;
    if (vcRef.length == 0) {
      let factory = this.resolver.resolveComponentFactory(ToastComponent);
      cmp = vcRef.createComponent(factory);
      Object.assign(cmp.instance.options, options);
    }
    let _message = new NgMessage();
    Object.assign(_message, message);
    setTimeout(() => {
      this.messageService.add(_message);
    }, 0);
  }

  clearToasts() {
    this.messageService.clear();
  }

  successfullToast(vcRef: ViewContainerRef): void {
    return this.showToast(
      {
        summary: 'عملیات با موفقیت انجام شد.',
        detail: 'success',
        severity: 'success',
      },
      vcRef
    );
  }

  //////////////////////////////////////////////////////////////////////////
  //                           CONFIRM POPUP                              //
  //////////////////////////////////////////////////////////////////////////
  showConfirmPopup(
    options: NgConfirmPopupOptions,
    vcRef: ViewContainerRef
  ): Promise<any> {
    if (vcRef.get(0) == null) {
      let factory = this.resolver.resolveComponentFactory(
        ConfirmPopupComponent
      );
      let cmp = vcRef.createComponent(factory, 0);
      Object.assign(cmp.instance.options, options);
    }
    return new Promise((accept, reject) => {
      this.confirmationService.confirm({
        target: options.target,
        message: options.message,
        icon: options.icon,
        accept: () => {
          accept(true);
        },
        reject: () => {
          accept(false);
        },
      });
    });
  }

  showConfirm(
    options: NgConfirmOptions,
    vcRef: ViewContainerRef
  ): Promise<any> {
    let factory = this.resolver.resolveComponentFactory(ConfirmComponent);
    let cmp = vcRef.createComponent(factory);
    Object.assign(cmp.instance.options, options);
    return new Promise((accept, reject) => {
      this.confirmationService.confirm({
        key: options.key,
        header: options.header,
        message: options.message,
        icon: options.icon,
        blockScroll: options.blockScroll,
        accept: () => {
          vcRef.clear();
          accept(true);
        },
        reject: () => {
          vcRef.clear();
          accept(false);
        },
      });
    });
  }

  cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.showConfirm(
      {
        header: 'لغو عملیات',
        message: 'آیا عملیات لغو شوند؟',
        icon: 'fa fa-exclamation-triangle',
      },
      vcRef
    );
  }

  deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.showConfirm(
      {
        message: 'آیا از حذف این مورد اطمینان دارید؟',
        header: 'هشدار',
        icon: 'fa fa-times',
      },
      vcRef
    );
  }

  //////////////////////////////////////////////////////////////////////////
  //                               FILTER                                 //
  //////////////////////////////////////////////////////////////////////////
  startsWith(value: any, filter: any) {
    return this.filterService.filters.startsWith(value, filter);
  }

  contains(value: any, filter: any) {
    return this.filterService.filters.contains(value, filter);
  }

  endsWith(value: any, filter: any) {
    return this.filterService.filters.endsWith(value, filter);
  }

  equals(value: any, filter: any) {
    return this.filterService.filters.equals(value, filter);
  }

  notEquals(value: any, filter: any) {
    return this.filterService.filters.notEquals(value, filter);
  }

  in(value: any, filter: any) {
    return this.filterService.filters.in(value, filter);
  }

  lt(value: any, filter: any) {
    return this.filterService.filters.lt(value, filter);
  }

  lte(value: any, filter: any) {
    return this.filterService.filters.lte(value, filter);
  }

  gt(value: any, filter: any) {
    return this.filterService.filters.gt(value, filter);
  }

  gte(value: any, filter: any) {
    return this.filterService.filters.gte(value, filter);
  }

  is(value: any, filter: any) {
    return this.filterService.filters.is(value, filter);
  }

  isNot(value: any, filter: any) {
    return this.filterService.filters.isNot(value, filter);
  }

  before(value: any, filter: any) {
    return this.filterService.filters.before(value, filter);
  }

  after(value: any, filter: any) {
    return this.filterService.filters.after(value, filter);
  }
  //////////////////////////////////////////////////////////////////////////
  //                         PERSIAN-ENGLISH                              //
  //////////////////////////////////////////////////////////////////////////
  replaceArabicLettersWithPersianLetters(inputStr: string): string {
    if (inputStr == undefined) return '';
    inputStr = inputStr.replace(/ي/g, 'ی');
    inputStr = inputStr.replace(/ك/g, 'ک');
    return inputStr;
  }

  isPersianNumber(number: number | string): boolean {
    var num = number as string;
    var regexp = new RegExp('^[\u06F0-\u06F9]+$');
    return regexp.test(num);
  }

  toPersianNumber(number: number | string): string {
    var num = number as string;
    return this.arabicNumberToPersian(this.engNumberToPersian(num));
  }

  toEngNumber(number: string): number {
    var num = number as string;
    var engNumber = +this.persianNumberToEng(num);
    if (isNaN(engNumber)) throw `${number} is not valid persian Number`;
    return engNumber;
  }

  toPersianWord(number: number | string): string {
    return new NumberToPersianWord().convertNumberToString(
      this.toEngNumber(number as string)
    );
  }

  engNumberToPersian(number: string): string {
    if (number == undefined) return '';
    var str = number.toString().trim();
    if (str === '') return '';
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }

  arabicNumberToPersian(number: string): string {
    if (number == undefined) return '';
    var str = number.toString().trim();
    if (str === '') return '';
    str = str.replace(/٤/g, '۴');
    str = str.replace(/٥/g, '۵');
    str = str.replace(/٦/g, '۶');
    return str;
  }

  persianNumberToEng(number: string) {
    if (number == undefined) return NaN;
    var str = number.toString().trim();
    if (str === '') return NaN;
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return str;
  }
  //////////////////////////////////////////////////////////////////////////
  //                              GENERAL                                 //
  //////////////////////////////////////////////////////////////////////////
  checkConnection(): Observable<boolean> {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  shallowClone(obj) {
    return Object.assign({}, obj);
  }

  getDirtyControls(
    form: FormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, { [val[0]]: val[1].value }),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0]),
    }[type]();
    return Object.assign(result, { id: form.get('id').value });
  }

  //////////////////////////////////////////////////////////////////////////
  //                              DIALOG                                  //
  //////////////////////////////////////////////////////////////////////////
  test1(vcRef: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(ConfirmPopupComponent);
    let componentRef = vcRef.createComponent(factory, 0);
  }

  test2() {
    const factory = this.resolver.resolveComponentFactory(
      ConfirmPopupComponent
    );
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  showDialogForm(
    header: string,
    config: NgDialogFormConfig[],
    options?: NgDialogFormOptions
  ): DynamicDialogRef {
    const _options = new NgDialogFormOptions();
    Object.assign(_options, options);
    return this.dialogService.open(DialogFormComponent, {
      header,
      data: { config, options: _options },
      width: _options.width,
      styleClass: _options.rtl ? 'rtl' : 'ltr',
      footer: _options.footer,
      height: _options.height,
      closeOnEscape: _options.closeOnEscape,
      dismissableMask: _options.dismissableMask,
      closable: _options.closable,
      showHeader: _options.showHeader,
      baseZIndex: 200000,
    });
  }
}
