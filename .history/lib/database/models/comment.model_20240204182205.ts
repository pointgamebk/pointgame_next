import { Schema, model, models, Document } from "mongoose";

export interface IComment extends Document {
  createdAt: Date;
  body: string;
  game: {
    _id: string;
  };
  user:
}
