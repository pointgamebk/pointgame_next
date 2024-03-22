import { Schema, model, models } from "mongoose";

const MatchSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  schedule: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
  teamOne: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  teamTwo: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  winner: { type: Schema.Types.ObjectId, ref: "Team" },
});
