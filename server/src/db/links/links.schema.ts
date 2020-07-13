import * as mongoose from "mongoose"
import { setUpdatedAt } from "./links.methods"
import { findOneOrCreate } from "./links.statics"

const LinkSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,
    unique: true,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  urlId: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Statics
LinkSchema.statics.findOneOrCreate = findOneOrCreate

// Methods
LinkSchema.methods.setUpdatedAt = setUpdatedAt

export default LinkSchema
