"use client";

import { IGame } from "@/lib/database/models/game.model";
import { formatDateTime } from "@/lib/utils";

type CardLocaleConverterProps = {
  game: IGame;
};

const CardLocaleConverter = ({ game }: CardLocaleConverterProps) => {
  return (
    <p>
      {formatDateTime(event.startDateTime).dateOnly} -{" "}
      {formatDateTime(event.startDateTime).timeOnly}
    </p>
  );
};

export default CardLocaleConverter;
