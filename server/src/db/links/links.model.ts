import * as mongoose from "mongoose"
import LinkSchema from "./links.schema"
import { ILinkDocument, ILinkModel } from "./links.types"

export const LinkModel = mongoose.model<ILinkDocument>(
  "Link",
  LinkSchema
) as ILinkModel
