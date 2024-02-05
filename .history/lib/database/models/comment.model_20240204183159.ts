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

const CommentSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
