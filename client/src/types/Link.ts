export interface ILink {
  urlId: string;
  original: string;
  shortened: string;
  createdAt: Date;
  updatedAt?: Date;
  popularity: number;
}