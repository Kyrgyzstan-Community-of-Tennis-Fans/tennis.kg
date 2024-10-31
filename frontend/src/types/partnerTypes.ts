export interface Partner {
  _id: string;
  name: string;
  image: string | null;
  url: string;
}

export type mutationPartner = Omit<Partner, '_id'>