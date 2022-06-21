import { Request, Response } from "express"

import { LinkModel } from "@/database/links/links.model"
import { reduceLink, shortId } from "@/utils"

export const shortenLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url: original } = req.body
    const linkId = shortId().toLowerCase()
    const shortened = reduceLink(linkId)
    const newLink = new LinkModel({
      linkId,
      original,
      shortened,
      popularity: 0,
    })

    await LinkModel.findOneOrCreate(newLink)
    res.status(201).json(newLink)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const links = await LinkModel.find()
    res.status(200).json(links)
  } catch (error) {
    res.status(500).json({ error: "An error occurred, please try again" })
  }
}

export const getLinkById = async (req: Request, res: Response): Promise<void> => {
  const { linkId } = req.params
  try {
    const link = await LinkModel.findOneAndUpdate({ linkId }, { $inc: { popularity: 1 } })
    res.status(link ? 200 : 404).json(link)
  } catch (error) {
    res.status(500).json({ error: "An error occurred, please try again" })
  }
}
