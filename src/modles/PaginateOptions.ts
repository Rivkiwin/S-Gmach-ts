export class PaginateOptions {
  select?: Object | string;
  sort?: any | string;
  populate?:
    | Array<Object>
    | Array<string>
    | Object
    | string
  //   | QueryPopulateOptions;
  lean?: boolean;
  leanWithId?: boolean;
  offset?: number;
  page: number=0;
  total:number=0;
  limit?: number;
  pageSize: number = 5;
  pageNo: number = 1;
  query:any={};

}