export interface IResponseCardLocation {
  name: string;
  url: string;
}

export interface IResponseCard {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: IResponseCardLocation;
  name: string;
  origin: IResponseCardLocation;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface IResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: IResponseCard[];
}

export interface ICardForm {
  email: string;
  date: string;
  select: string;
  checkbox: boolean;
  switcher: boolean;
  file: File;
  imagePreviewUrl: string | ArrayBuffer | null;
}
