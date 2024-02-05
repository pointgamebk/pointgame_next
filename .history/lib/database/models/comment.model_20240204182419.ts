import { Schema, model, models, Document } from "mongoose";

export interface IComment extends Document {
  createdAt: Date;
  body: string;
  game: {
    _id: string;
  };
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

export type ICommentItem = {
  _id: string;
  createdAt: Date;
  body: string;
  gameId: string;
  user: string;
};
