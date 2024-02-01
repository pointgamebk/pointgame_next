"use client";

import { IGame } from "@/lib/database/models/game.model";

type GameFormProps = {
  userId: string;
  type: "Create" | "Update";
  game?: IGame;
  gameId?: string;
};

const GameForm = ({ userId, type, game, gameId }: GameFormProps) => {
  return <div>GameForm</div>;
};

export default GameForm;
