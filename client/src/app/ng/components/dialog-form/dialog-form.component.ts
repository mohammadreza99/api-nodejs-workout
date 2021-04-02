import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  NgDialogFormConfig,
  NgDialogFormOptions,
  NgDialogFormRule,
  NgDialogFormRuleAction,
} from '@ng/models/overlay';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogFormComponent implements OnInit {
  constructor(
    @Optional() public dialogConfig: DynamicDialogConfig,
    @Optional() private dialogRef: DynamicDialogRef,
    private cd: ChangeDetectorRef
  ) {}

  form = new FormGroup({});
  formConfig: NgDialogFormConfig[];
  formOptions: NgDialogFormOptions;
  unsubscribeSignal: Subject<void> = new Subject();

  test = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      zipcode: new FormControl(),
    }),
    cars: new FormArray([
      new FormGroup({
        name: new FormControl(),
        models: new FormControl(),
      }),
    ]),
  });
  a = {
    id: '',
    name: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
    cars: [
      { name: '', models: '' },
      { name: '', models: '' },
    ],
  };
  b = [
    {
      type: 'text',
      formControlName: 'id',
    },
    {
      type: 'text',
      formControlName: 'name',
    },
    {
      type: 'group',
      formControlName: 'address',
      children: [
        {
          type: 'text',
          formControlName: 'street',
        },
        {
          type: 'text',
          formControlName: 'city',
        },
        {
          type: 'text',
          formControlName: 'zipCode',
        },
      ],
    },
    {
      type: 'array',
      formControlName: 'cars',
      arrayTemplate: [
        {
          type: 'text',
          formControlName: 'name',
        },
        {
          type: 'text',
          formControlName: 'models',
        },
      ],
    },
  ];
  createFormControls(config: NgDialogFormConfig) {
    if (<any>config.type == 'group') {
      this.form.addControl(config.formControlName, new FormGroup({}));
      for (const child of (<any>config).childen) {
        const group = this.form.get(config.formControlName) as FormGroup;
        group.addControl(
          child.formControlName,
          new FormControl(child.value != null ? child.value : null)
        );
        this.createFormControls(child);
      }
    } else {
      if (config.formControlName) {
        this.form.addControl(
          config.formControlName,
          new FormControl(config.value != null ? config.value : null)
        );
      }
    }
  }

  ngOnInit() {
    this.formConfig = JSON.parse(JSON.stringify(this.dialogConfig.data.config));
    this.formOptions = this.dialogConfig.data.options;
    for (const config of this.formConfig) {
      if (config.formControlName) {
        this.form.addControl(config.formControlName, new FormControl(null));
      }
      if (config.errors) {
        this.setValidator(config);
      }
      if (config.rules) {
        this.form
          .get(config.formControlName)
          .valueChanges.pipe(takeUntil(this.unsubscribeSignal.asObservable()))
          .subscribe((res) => {
            this.handleRules(config, res);
          });
      }
    }
    for (const config of this.formConfig) {
      if (config.value != null) {
        if (config.type == 'date-picker') {
          this.form
            .get(config.formControlName)
            .setValue(moment(new Date(config.value.split('T')[0])));
        } else {
          this.form.get(config.formControlName).setValue(config.value);
        }
        if (config.rules) {
          this.handleRules(config, config.value);
        }
      }
    }
  }

  handleRules(config: NgDialogFormConfig, value: any) {
    for (const rule of config.rules) {
      if (rule.tobe.some((v) => value == v)) {
        this.applyAction(rule, false);
      } else {
        this.applyAction(rule, true);
      }
    }
    this.cd.detectChanges();
  }

  changeVisibility(config: NgDialogFormConfig, action: NgDialogFormRuleAction) {
    if (config) {
      let control = this.form.get(config.formControlName);
      switch (action) {
        case 'visible':
          config.visible = true;
          if (control.disabled) control.enable();
          break;
        case 'invisible':
          config.visible = false;
          switch (config.type) {
            case 'single-checkbox':
            case 'switch':
              control.setValue(false);
              break;
            default:
              control.setValue(null);
          }
          if (control.enabled) control.disable();
          break;
      }
    }
  }

  applyAction(rule: NgDialogFormRule, reverse: boolean) {
    let target = this.formConfig.find((c) => c.formControlName == rule.control);
    if (!reverse) {
      switch (rule.action) {
        case 'enable':
          this.form.get(target.formControlName).enable();
          break;
        case 'disable':
          this.form.get(target.formControlName).disable();
          break;
        case 'invisible':
          this.changeVisibility(target, 'invisible');
          break;
        case 'visible':
          this.changeVisibility(target, 'visible');
          break;
      }
    } else {
      switch (rule.action) {
        case 'enable':
          this.form.get(target.formControlName).disable();
          break;
        case 'disable':
          this.form.get(target.formControlName).enable();
          break;
        case 'invisible':
          this.changeVisibility(target, 'visible');
          break;
        case 'visible':
          this.changeVisibility(target, 'invisible');
          break;
      }
    }
  }

  setValidator(config: NgDialogFormConfig) {
    const errObj = {};
    const validators: ValidatorFn[] = [];
    for (const e of config.errors) {
      switch (e.type) {
        case 'required':
        case 'requiredTrue':
        case 'email':
        case 'nullValidator':
          validators.push(Validators[e.type]);
          break;
        default:
          validators.push(Validators[e.type](e.value));
          break;
      }
      errObj[e.type] = e.message;
    }
    config.errors = errObj as any;
    this.form.controls[config.formControlName].setValidators([...validators]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.unsubscribeSignal.next();
      this.unsubscribeSignal.unsubscribe();
    }
  }

  onCancel() {
    this.dialogRef.close(null);
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
