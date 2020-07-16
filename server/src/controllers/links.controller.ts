import { Request, Response, NextFunction } from "express"

import * as shortid from "../utils/shortid"
import { LinkModel } from "../database/links/links.model"
import { ILinkDocument } from "../database/links/links.types"

export const shortenLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { url: original } = req.body
    const urlId = shortid.generate().toLowerCase()
    const shortened = `https://pbid.io/${urlId}`
    const newLink: ILinkDocument = new LinkModel({
      urlId,
      original,
      shortened,
      popularity: 0,
    })

    await LinkModel.findOneOrCreate(newLink)
    res.status(201).json(newLink)
  } catch (error) {
    res.status(404).json({ error })
  }
}

export const getLinks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const links = await LinkModel.find()
    res.status(200).json(links)
  } catch (error) {
    res.status(500).json({ error: "An error occurred, please try again" })
  }
}

export const getLinkById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { urlId } = req.params
  try {
    const link = await LinkModel.findOneAndUpdate(
      { urlId },
      { $inc: { popularity: 1 } }
    )
    res.status(link ? 200 : 404).json(link)
  } catch (error) {
    res.status(500).json({ error: "An error occurred, please try again" })
  }
  next()
}
