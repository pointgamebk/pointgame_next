import { Document, Schema, model, models } from "mongoose";

export interface IGame extends Document {
  _id: string;
  title: string;
  description?: string;
  location: string;
  createdAt: Date;
  startDateTime: Date;
  endDateTime: Date;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
  joins: [{ _id: string; firstName: string }];
}

const GameSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
  joins: [
    { type: Schema.Types.ObjectId, ref: "User", default: [], required: true },
  ],
});

const Game = models.Game || model("Game", GameSchema);

export default Game;
