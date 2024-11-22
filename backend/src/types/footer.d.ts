export interface LinksMediaFields {
  name: string;
  value: string;
}

export interface FooterFields {
  socialNetwork: LinksMediaFields[];
  menuPosition: LinksMediaFields[];
  publicOffer: string;
  mainPartnerImage: string | null;
}
