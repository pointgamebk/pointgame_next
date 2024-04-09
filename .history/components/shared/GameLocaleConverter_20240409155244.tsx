"use client";

import { IGame } from "@/lib/database/models/game.model";
import { formatDateTime } from "@/lib/utils";

type GameLocaleConverterProps = {
  game: IGame;
};

const GameLocaleConverter = ({ game }: GameLocaleConverterProps) => {
  return (
    <p className="p-medium-16 p-medium-18 text-grey-500">
      {formatDateTime(game.startDateTime).dateTime}
    </p>
  );
};

export default GameLocaleConverter;
