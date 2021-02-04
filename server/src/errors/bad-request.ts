export class BadRequest extends Error {
  status: string
  statusCode: number

  constructor(message: string) {
    super(message)

    this.status = "Fail"
    this.statusCode = 404

    Error.captureStackTrace(this, this.constructor)
  }
}
