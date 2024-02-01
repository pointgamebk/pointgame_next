import { Schema, model, models, Document } from "mongoose";

export interface IJoin extends Document {
  createdAt: Date;
  game: {
    _id: string;
    title: string;
    category: string;
  };
  player: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

export type IJoinItem = {
  _id: string;
  createdAt: Date;
  gameTitle: string;
  gameId: string;
  player: string;
};

const JoinSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Join = models.Join || model("Join", JoinSchema);

export default Join;
