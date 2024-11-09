export interface News {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  newsCover: string;
  images: string[];
}

export interface NewsMutation {
  title: string;
  subtitle: string;
  content: string;
  newsCover: string | File;
  images: string[] | File[];
}

export interface NewsResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: News[];
}
