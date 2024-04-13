import { Schema, model, models } from "mongoose";

export interface ILeague extends Document {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  location: string;
  category: { _id: string; name: string };
  administrator: { _id: string; firstName: string; lastName: string };
  teams: [{ _id: string; name: string }];
  schedules: [{ _id: string; name: string }];
}

const LeagueSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  location: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  administrator: { type: Schema.Types.ObjectId, ref: "User" },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  schedules: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
});

const League = models.League || model("League", LeagueSchema);

export default League;
