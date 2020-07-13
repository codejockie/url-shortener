import { ILinkDocument, ILinkModel } from "./links.types"

export async function findOneOrCreate(
  this: ILinkModel,
  {
    original,
    shortened,
    popularity,
    urlId,
  }: { urlId: string; original: string; shortened: string; popularity: number }
): Promise<ILinkDocument> {
  const record = await this.findOne({ original, shortened, popularity })
  if (record) {
    return record
  } else {
    return this.create({ urlId, original, shortened, popularity })
  }
}
