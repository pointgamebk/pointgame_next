"use client";

import { IGame } from "@/lib/database/models/game.model";
import { formatDateTime } from "@/lib/utils";

type GameLocaleConverterProps = {
  game: IGame;
};

const GameLocaleConverter = ({ game }: GameLocaleConverterProps) => {
  return (
    <>
      <p className="text-white">
        {formatDateTime(game.startDateTime).dateOnly} -{" "}
        {formatDateTime(game.startDateTime).timeOnly}
      </p>
      <p className="text-white">
        {formatDateTime(game.endDateTime).dateOnly} -{" "}
        {formatDateTime(game.endDateTime).timeOnly}
      </p>
    </>
  );
};

export default GameLocaleConverter;
