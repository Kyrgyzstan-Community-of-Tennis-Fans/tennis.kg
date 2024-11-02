export interface RatingMember {
  _id: string;
  name: string;
  image: string | null | File;
  gender: string;
  place: number;
  mensRatingCategory?: string;
  womensRatingCategory?: string;
}

export interface UpdateRatingMemberArg {
  id: string;
  ratingMemberMutation: RatingMemberMutation;
}

export interface RatingMemberMutation {
  name: string;
  image: File | null | string;
  gender: string;
  place: string;
}

export interface UpdateCategoryArg {
  mensRatingCategory: string;
  womensRatingCategory: string;
}
