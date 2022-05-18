export interface IDataType<T = any> {
  code: string;
  data?: T;
  rows?: Array<any>;
  // exceptionLogId?:string;
  info?: string;
  // messageContext?:any;
  success?: boolean;
  total?: number;
  isDelete?: boolean;
  // traceId?:string;
  // value?:string
}
