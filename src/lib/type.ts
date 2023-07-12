export interface IList {
  id: string;
  contents: string;
  star: boolean;
  complete: boolean;
  category: string;
  bgColor: string;
}

export interface ICategory {
  Id: string;
  title: string;
  bgColor: string;
}
