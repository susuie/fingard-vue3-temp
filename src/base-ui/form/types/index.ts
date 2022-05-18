type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'cascader'
  | 'radio';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  labelWidth?: string;
  defaultValue?: any;
  placeholder?: any;
  options?: any[];
  // 针对特殊的属性
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
  list?: any;
  otherOptions?: any;
}
