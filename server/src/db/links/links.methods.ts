import { ILinkDocument } from "./links.types"

export async function setUpdatedAt(this: ILinkDocument): Promise<void> {
  const now = new Date()
  if (!this.updatedAt || this.updatedAt < now) {
    this.updatedAt = now
    await this.save()
  }
}
