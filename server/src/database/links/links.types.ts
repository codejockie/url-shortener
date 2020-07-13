import { Document, Model } from "mongoose"

export interface ILink {
  urlId: string
  original: string
  shortened: string
  createdAt?: Date
  updatedAt?: Date
  popularity: number
}

export interface ILinkDocument extends ILink, Document {
  setUpdatedAt: (this: ILinkDocument) => Promise<void>
}

export interface ILinkModel extends Model<ILinkDocument> {
  findOneOrCreate: (
    this: ILinkModel,
    {
      urlId,
      original,
      shortened,
      popularity,
    }: {
      urlId: string
      original: string
      shortened: string
      popularity: number
    }
  ) => Promise<ILinkDocument>
}
