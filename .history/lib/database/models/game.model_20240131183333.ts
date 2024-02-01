import { Document, Schema, model, models } from "mongoose";

export interface IGame extends Document {
  _id: string;
  title: string;
  description?: string;
  location: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const GameSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Game = models.Game || model("Game", GameSchema);

export default Game;
