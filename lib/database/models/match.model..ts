import { Document, Schema, model, models } from "mongoose";

export interface IMatch extends Document {
  _id: string;
  startDateTime: Date;
  schedule: { _id: string; name: string };
  teamOne: { _id: string; name: string };
  teamTwo: { _id: string; name: string };
  winner?: { _id: string; name: string };
}

const MatchSchema = new Schema({
  startDateTime: { type: Date, default: Date.now },
  schedule: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
  teamOne: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  teamTwo: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  winner: { type: Schema.Types.ObjectId, ref: "Team" },
});

const Match = models.Match || model("Match", MatchSchema);

export default Match;
