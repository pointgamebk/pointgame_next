"use client";

import { IGame } from "@/lib/database/models/game.model";
import { formatDateTime } from "@/lib/utils";

type CardLocaleConverterProps = {
  game: IGame;
};

const CardLocaleConverter = ({ game }: CardLocaleConverterProps) => {
  return (
    <p className="p-medium-16 p-medium-18 text-grey-500 mb-5">
      {formatDateTime(game.startDateTime).dateTime}
    </p>
  );
};

export default CardLocaleConverter;
