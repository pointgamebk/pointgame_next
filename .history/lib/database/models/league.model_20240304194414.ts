import { Schema, model, models } from "mongoose";

export interface ILeague extends Document {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  category: string;
  administrator: string;
  teams: string[];
}

const LeagueSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  administrator: { type: Schema.Types.ObjectId, ref: "User" },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
});

const League = models.League || model("League", LeagueSchema);

export default League;
