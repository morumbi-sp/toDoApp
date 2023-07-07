export interface IList {
  id: string;
  category: string;
  bgColor: string;
  list: {
    id: string;
    contents: string;
    star: boolean;
    complete: boolean;
  }[];
}
[];
