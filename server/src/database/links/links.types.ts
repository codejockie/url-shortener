import { Document, Model } from "mongoose"

export interface ILink {
  linkId: string
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
  findOneOrCreate(
    this: ILinkModel,
    { linkId, original, shortened, popularity }: Omit<ILink, "createdAt" | "updatedAt">
  ): Promise<ILinkDocument>
}
