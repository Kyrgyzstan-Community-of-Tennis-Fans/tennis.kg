export interface RatingMember {
  _id: string;
  name: string;
  image: string;
  gender: 'male' | 'female';
  place: number;
}

export interface RatingMemberMutation {
  _id: string;
  name: string;
  image: string;
  gender: 'male' | 'female';
  place: string;
}
