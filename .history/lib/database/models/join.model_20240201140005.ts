import { Schema, model, models, Document } from "mongoose";

export interface IJoin extends Document {
  createdAt: Date;
  game: {
    _id: string;
    title: string;
  };
  player: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}
