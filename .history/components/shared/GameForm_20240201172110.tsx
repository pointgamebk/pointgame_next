"use client";

import { IGame } from "@/lib/database/models/game.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IGame;
  eventId?: string;
};

const GameForm = () => {
  return <div>GameForm</div>;
};

export default GameForm;
