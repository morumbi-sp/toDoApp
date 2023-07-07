export interface IList {
  id: string;
  category: string;
  bgColor: string;
  list: IItem[];
}

export interface IItem {
  id: string;
  contents: string;
  star: boolean;
  complete: boolean;
}
