import { Request, Response, NextFunction } from "express"

import * as shortid from "../utils/shortid"
import { LinkModel } from "../database/links/links.model"
import { ILink, ILinkDocument } from "../database/links/links.types"

const baseUrl = process.env.BASE_URL ?? "pbid.io"

export const shortenUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { url: original } = req.body
    const urlId = shortid.generate().toLowerCase()
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

export const getLinks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { urlId } = req.params
  try {
    const links = await LinkModel.find()
    res.status(200).send(links)
  } catch (error) {
    res.status(301).redirect("/api")
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
    res.status(link ? 200 : 400).send(link)
  } catch (error) {
    res.status(500).send({ error: "An error occurred, please try again" })
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
