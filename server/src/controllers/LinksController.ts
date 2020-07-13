import { Request, Response, NextFunction } from "express"

import * as shortid from "../utils/shortid"
import { LinkModel } from "../db/links/links.model"
import { ILink, ILinkDocument } from "../db/links/links.types"

const baseUrl = process.env.BASE_URL ?? "pbid.io"

export const shortenUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const urlId = shortid.generate()
    const { url: original } = req.body
    const shortened = `https://${baseUrl ? baseUrl : req.headers.host}/${urlId}`
    const link: ILink = {
      urlId,
      original,
      shortened,
      popularity: 0,
    }
    const newLink: ILinkDocument = new LinkModel(link)

    await LinkModel.findOneOrCreate(newLink)
    res.status(201).json(newLink)
  } catch (error) {
    res.status(404).json({ error: `${error}` })
  }
}

export const getLinkById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { urlId } = req.params
  try {
    const url = await LinkModel.findOneAndUpdate(
      { urlId },
      { $inc: { popularity: 1 } }
    )
    res.status(301).redirect(url ? `https://${url.original}` : "/api")
  } catch (error) {
    res.status(301).redirect("/api")
  }
  next()
}

export const deleteLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { urlId } = req.params
  try {
    await LinkModel.findOneAndDelete({ urlId })
    res.status(204)
  } catch (error) {
    res.status(404).json({ error: `${error}` })
  }
}
