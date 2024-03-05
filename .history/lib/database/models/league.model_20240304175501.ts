import { Schema, model, models } from "mongoose";

const LeagueSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  administrator: { type: Schema.Types.ObjectId, ref: "User" },
});

const League = models.League || model("League", LeagueSchema);
