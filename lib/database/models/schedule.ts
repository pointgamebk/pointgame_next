import { Document, Schema, model, models } from "mongoose";

export interface ISchedule extends Document {
  _id: string;
  createdAt: Date;
  league: { _id: string; name: string };
  matches: [
    {
      _id: string;
      startDateTime: Date;
      teamOne: { _id: string; name: string };
      teamTwo: { _id: string; name: string };
      winner?: { _id: string; name: string };
    }
  ];
}

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  league: { type: Schema.Types.ObjectId, ref: "League", required: true },
  matches: [{ type: Schema.Types.ObjectId, ref: "Match" }],
});

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);

export default Schedule;
