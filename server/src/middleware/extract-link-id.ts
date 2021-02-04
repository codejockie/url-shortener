import { NextFunction, Request, Response } from "express"

export const extractLinkId = (req: Request, res: Response, next: NextFunction) => {
  req.body.id = req.params.linkId
  next()
}
