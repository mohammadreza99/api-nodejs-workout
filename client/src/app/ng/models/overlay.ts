import { HttpHeaders } from '@angular/common/http';
import { ContextMenu } from 'primeng/contextmenu';
import { NgButtonAppearance } from './button';
import { NgColor } from './color';
import {
  NgAddonConfig,
  NgColorFormat,
  NgCurrency,
  NgCurrencyDisplay,
  NgDatePickerMode,
  NgErrorType,
  NgFilterMatchMode,
  NgInputFileMode,
  NgKeyFilter,
  NgLabelPosition,
  NgNumberButtonLayout,
  NgNumberMode,
} from './forms';
import { NgOrientation, NgPosition, NgSelectionMode, NgSize } from './offset';
import { NgTreeFilterMode } from './tree';

export class NgConfirmOptions {
  header?: string;
  message?: string;
  key?: string;
  icon?: string;
  width?: string;
  closable?: boolean;
  acceptLabel?: string;
  acceptVisible?: boolean;
  acceptColor?: NgColor;
  acceptAppearance?: NgButtonAppearance;
  acceptIcon?: string;
  rejectLabel?: string;
  rejectColor?: NgColor;
  rejectAppearance?: NgButtonAppearance;
  rejectIcon?: string;
  rejectVisible?: boolean;
  rtl?: boolean;
  position?: NgPosition;
  blockScroll?: boolean;
  dismissableMask?: boolean;
  constructor() {
    this.icon = 'pi pi-info-circle';
    this.width = '30vw';
    this.closable = true;
    this.acceptLabel = 'بله';
    this.acceptVisible = true;
    this.acceptColor = 'primary';
    this.acceptAppearance = 'basic';
    this.acceptIcon = 'pi pi-check';
    this.rejectLabel = 'خیر';
    this.rejectColor = 'danger';
    this.rejectAppearance = 'outlined';
    this.rejectIcon = 'pi pi-times';
    this.rejectVisible = true;
    this.rtl = true;
    this.position = 'center';
    this.blockScroll = true;
    this.dismissableMask = false;
  }
}

export class NgConfirmPopupOptions extends NgConfirmOptions {
  target: any;
}

export class NgToastOptions {
  key?: string;
  preventOpenDuplicates?: boolean;
  preventDuplicates?: boolean;
  position?: NgPosition;
  rtl: boolean;
  constructor() {
    this.key = null;
    this.preventOpenDuplicates = false;
    this.preventDuplicates = false;
    this.position = 'top-right';
    this.rtl = true;
  }
}

export type NgMessageSeverities = 'success' | 'info' | 'warn' | 'error';

export class NgMessage {
  severity?: NgMessageSeverities;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  constructor() {
    this.severity = 'info';
    this.life = 3000;
    this.sticky = false;
    this.closable = true;
    this.summary = null;
    this.detail = null;
    this.id = null;
    this.data = null;
  }
}

export class NgMessageOptions {
  escape?: boolean;
  closable?: boolean;
  rtl?: boolean;
  constructor() {
    this.escape = true;
    this.closable = true;
    this.rtl = true;
  }
}

export type NgDialogFormError = {
  type: NgErrorType;
  message: string;
  value?: any;
};

export class NgDialogFormOptions {
  footer?: string;
  width?: string = '600px';
  height?: string;
  closeOnEscape?: boolean = true;
  dismissableMask?: boolean = false;
  closable?: boolean = true;
  showHeader?: boolean = true;
  rtl?: boolean = true;
  acceptVisible? = true;
  acceptIcon?: string = 'pi pi-check';
  acceptColor?: NgColor = 'primary';
  acceptLabel?: string = 'ذخیره';
  acceptAppearance?: NgButtonAppearance = 'basic';
  rejectVisible? = true;
  rejectIcon?: string = 'pi pi-times';
  rejectColor?: NgColor = 'danger';
  rejectLabel?: string = 'لغو';
  rejectAppearance?: NgButtonAppearance = 'outlined';
}

export type NgDialogFormRuleAction =
  | 'visible'
  | 'invisible'
  | 'disable'
  | 'enable';

export interface NgDialogFormRule {
  tobe: any[];
  control: string;
  action: NgDialogFormRuleAction;
}

export type NgDialogFormInputTypes =
  | 'hidden'
  | 'row'
  | 'template'
  | 'autocomplete'
  | 'cascade-select'
  | 'chips'
  | 'color-picker'
  | 'date-picker'
  | 'dropdown'
  | 'dropdown-tree'
  | 'editor'
  | 'file-picker'
  | 'file-picker2'
  | 'text'
  | 'mask'
  | 'number'
  | 'password'
  | 'textarea'
  | 'list-box'
  | 'multi-checkbox'
  | 'multi-select'
  | 'radio'
  | 'rating'
  | 'select-button'
  | 'single-checkbox'
  | 'slider'
  | 'switch'
  | 'toggle-button'
  | 'tree';

export interface NgDialogFormConfig {
  type: NgDialogFormInputTypes;
  formControlName?: string;
  className?: string | string[];
  visible?: boolean;
  value?: any;
  suggestions?: any[];
  dropdown?: boolean;
  minlength?: number;
  completeOnFocus?: boolean;
  autoHighlight?: boolean;
  immutable?: boolean;
  forceSelection?: boolean;
  dropdownMode?: 'blank' | 'current';
  unique?: boolean;
  field?: string;
  allowDuplicate?: boolean;
  addOnTab?: boolean;
  addOnBlur?: boolean;
  locale?: string;
  datePickerMode?: NgDatePickerMode;
  inline?: boolean;
  clearable?: boolean;
  optionGroupLabel?: string;
  optionGroupChildren?;
  editable?: boolean;
  autofocus?: boolean;
  autoDisplayFirst?: boolean;
  group?: boolean;
  showClear?: boolean;
  name?: string;
  url?: string;
  withCredentials?: boolean;
  customUpload?: boolean;
  auto?: boolean;
  accept?: string;
  method?: string;
  maxFileSize?: number;
  previewWidth?: number;
  fileLimit?: number;
  resultType?: 'base64' | 'file';
  chooseLabel?: string;
  uploadLabel?: string;
  cancelLabel?: string;
  headers?: HttpHeaders;
  showUploadButton?: boolean;
  showCancelButton?: boolean;
  invalidFileSizeMessageSummary?: string;
  invalidFileSizeMessageDetail?: string;
  invalidFileTypeMessageSummary?: string;
  invalidFileLimitMessageDetail?: string;
  invalidFileLimitMessageSummary?: string;
  invalidFileTypeMessageDetail?: string;
  mask?: string;
  slotChar?: string;
  autoClear?: boolean;
  unmask?: boolean;
  characterPattern?: string;
  autoFocus?: boolean;
  autocomplete?: string;
  format?: NgColorFormat | boolean;
  showButtons?: boolean;
  buttonLayout?: NgNumberButtonLayout;
  incrementButtonIcon?: string;
  decrementButtonIcon?: string;
  mode?: NgInputFileMode | NgNumberMode;
  prefix?: string;
  suffix?: string;
  currency?: NgCurrency;
  currencyDisplay?: NgCurrencyDisplay;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  title?: string;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  feedback?: boolean;
  showPassword?: boolean;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxlength?: number;
  checkbox?: boolean;
  filled?: boolean;
  icon?: string;
  inputSize?: NgSize;
  appendTo?: string;
  autofocusFilter?;
  defaultLabel?: string;
  displaySelectedLabel?;
  emptyFilterMessage?: string;
  filterMatchMode?: NgFilterMatchMode;
  filterValue?: string;
  filterPlaceHolder?: string;
  maxSelectedLabels?;
  overlayVisible?: boolean;
  placeholder?: string;
  resetFilterOnHide?: boolean;
  selectedItemsLabel?: string;
  selectionLimit?: number;
  showHeader?: boolean;
  showToggleAll?: boolean;
  tooltip?: string;
  tooltipPosition?;
  stars?: number;
  cancel?: boolean;
  iconOnClass?: string;
  iconOffClass?: string;
  iconCancelClass?: string;
  addon?: NgAddonConfig;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  optionDisabled?: string;
  multiple?: boolean;
  dataKey?: string;
  binary?: boolean;
  animate?: boolean;
  min?: number;
  max?: number;
  orientation?: NgOrientation;
  step?: number;
  range?: boolean;
  onLabel?: string;
  offLabel?: string;
  onIcon?: string;
  offIcon?: string;
  iconPos?: NgPosition;
  disabled?: boolean;
  readonly?: boolean;
  selection?: any;
  label?: string;
  labelWidth?: number | string;
  hint?: string;
  rtl?: boolean;
  showRequiredStar?: boolean;
  labelPos?: NgLabelPosition;
  errors?: NgDialogFormError[];
  items?: any[];
  selectionMode?: NgSelectionMode;
  contextMenu?: ContextMenu;
  layout?: NgOrientation;
  draggableScope?: string;
  droppableScope?: string;
  draggableNodes?: string;
  droppableNodes?: string;
  metaKeySelection?: boolean;
  propagateSelectionUp?: boolean;
  propagateSelectionDown?: boolean;
  loading?: boolean;
  validateDrop?;
  emptyMessage?: string;
  filter?: boolean;
  filterBy?: string;
  filterMode?: NgTreeFilterMode;
  filterPlaceholder?: string;
  filterLocale?: string;
  scrollHeight?: string;
  virtualScroll?: boolean;
  virtualNodeHeight?: number;
  minBufferPx?: number;
  maxBufferPx?: number;
  trackBy?: Function;
  indentation?: number;
  size?: NgSize | number;
  keyFilter?: NgKeyFilter | RegExp;
  style?: any;
  template?: string;
  showImagePreview?: boolean;
  color?: NgColor;
  rules?: NgDialogFormRule[];
}
