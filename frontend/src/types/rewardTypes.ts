export interface RewardTypes {
  _id: string;
  user: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RewardMutation {
  title: string;
  description: string;
  user: string;
}
