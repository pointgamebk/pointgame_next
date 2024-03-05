import { Schema, model, models } from "mongoose";

export interface ITeam extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  league: { _id: string; name: string };
  players: [{ _id: string; firstName: string; lastName: string }];
}

const TeamSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  league: { type: Schema.Types.ObjectId, ref: "League", required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Team = models.Team || model("Team", TeamSchema);

export default Team;
