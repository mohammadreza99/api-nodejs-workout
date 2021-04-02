import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgAddonConfig } from '@ng/models/forms';

@Directive({
  selector: '[ngAddon]',
})
export class AddonDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @Input() ngAddon: {
    before?: NgAddonConfig;
    after?: NgAddonConfig;
  };
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();

  ngOnInit(): void {
    if (this.ngAddon) {
      for (const side in this.ngAddon) {
        const object = this.ngAddon[side] as NgAddonConfig;
        switch (object.type) {
          case 'button':
            const BTN = this.renderer.createElement('button');
            const BTN_ICON_SPAN = this.renderer.createElement('span');
            const BTN_TEXT_SPAN = this.renderer.createElement('span');
            const BTN_TEXT = this.renderer.createText(object.label);
            const _btnColor = object.color;
            const _btnIcon = object.icon || null;
            const _btnLabel = object.label || null;
            const _btnIconPos = object.iconPos || 'left';
            const _btnIconSpin = object.iconSpin || false;
            const _btnIconStylePrefix = object.iconStylePrefix || 'fas';
            const _btnIconRotation = object.iconRotation;
            this.renderer.setAttribute(BTN, 'type', 'button');
            this.renderer.addClass(BTN, 'p-button');
            this.renderer.addClass(BTN, 'p-component');
            this.renderer.addClass(BTN_TEXT_SPAN, 'p-button-label');
            this.renderer.appendChild(BTN_TEXT_SPAN, BTN_TEXT || 'p-btn');
            this.renderer.appendChild(BTN, BTN_ICON_SPAN);
            this.renderer.appendChild(BTN, BTN_TEXT_SPAN);
            this.renderer.addClass(BTN, `p-button-${_btnColor}`);
            if (_btnIcon != null) {
              if (_btnIconSpin)
                this.renderer.addClass(BTN_ICON_SPAN, 'fa-spin');
              this.renderer.addClass(BTN_ICON_SPAN, `${_btnIconStylePrefix}`);
              this.renderer.addClass(BTN_ICON_SPAN, `fa-${_btnIconRotation}`);
              this.renderer.addClass(BTN_ICON_SPAN, `fa-${_btnIcon}`);
              this.renderer.addClass(BTN_ICON_SPAN, 'p-button-icon');
              if (_btnLabel != null) {
                // has icon & text
                this.renderer.addClass(
                  BTN_ICON_SPAN,
                  `p-button-icon-${_btnIconPos}`
                );
                if (_btnIconPos == 'right') {
                  this.renderer.setStyle(BTN_ICON_SPAN, 'order', 1);
                }
              } else {
                // has icon only
                this.renderer.addClass(BTN, 'p-button-icon-only');
              }
            }
            this.addToDOM(BTN, side);
            this.renderer.listen(BTN, 'click', (evt) => {
              if (side == 'after') this.onAfterBtnClick.emit(evt);
              else this.onBeforeBtnClick.emit(evt);
            });
            break;
          case 'icon':
            const ICON = this.renderer.createElement('i');
            const ICON_SPAN = this.renderer.createElement('span');
            const _icon = object.icon;
            const _spin = object.spin || false;
            const _stylePrefix = object.stylePrefix || 'fas';
            const _rotation = object.rotation;
            this.renderer.addClass(ICON, `${_stylePrefix}`);
            this.renderer.addClass(ICON, `fa-${_icon}`);
            this.renderer.addClass(ICON, `fa-${_rotation}`);
            this.renderer.addClass(ICON_SPAN, 'p-inputgroup-addon');
            if (_spin) this.renderer.addClass(ICON, 'fa-spin');
            this.renderer.appendChild(ICON_SPAN, ICON);
            this.addToDOM(ICON_SPAN, side);
            break;
          case 'text':
            const TEXT = this.renderer.createText(object.text || null);
            const TEXT_SPAN = this.renderer.createElement('span');
            this.renderer.addClass(TEXT_SPAN, 'p-inputgroup-addon');
            this.renderer.appendChild(TEXT_SPAN, TEXT);
            this.addToDOM(TEXT_SPAN, side);
            break;
        }
      }
    }
  }

  addToDOM(el: any, pos: string) {
    let target = this.el.nativeElement;
    // this.renderer.setStyle(el, 'z-index', -1);
    if (target.parentNode.classList.value.includes('p-float-label')) {
      target = target.parentNode;
    }
    target.parentNode.classList.add('p-inputgroup');
    if (pos == 'after') {
      this.el.nativeElement.classList.add('has-after');
      this.renderer.insertBefore(target.parentNode, el, target);
    } else if (pos == 'before') {
      this.el.nativeElement.classList.add('has-before');
      this.renderer.appendChild(target.parentNode, el);
    }
  }
}
