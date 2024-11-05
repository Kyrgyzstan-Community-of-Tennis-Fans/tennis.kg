export interface Rating {
  _id: string;
  category: {
    _id: string;
    name: string;
  };
  year: number;
  month: string;
  gender: 'male' | 'female';
  link: string;
}

export interface RatingMutation {
  category: string;
  year: string;
  month: string;
  gender: 'male' | 'female';
  link: string;
}
