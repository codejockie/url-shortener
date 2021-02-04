import { ILinkDocument, ILinkModel } from "./links.types"

export async function findOneOrCreate(
  this: ILinkModel,
  {
    original,
    shortened,
    popularity,
    linkId,
  }: { linkId: string; original: string; shortened: string; popularity: number }
): Promise<ILinkDocument> {
  const record = await this.findOne({ original, shortened })
  if (record) {
    return record
  } else {
    return this.create({ linkId, original, shortened, popularity })
  }
}
