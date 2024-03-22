import { Schema, model, models } from "mongoose";

const MatchSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  league: { type: Schema.Types.ObjectId, ref: "League", required: true },
  //matches: [{ type: Schema.Types.ObjectId, ref: "Match" }],
});
