"use client";

import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";

type CommentLocaleConverterProps = {
  comment: IComment;
};

const GameLocaleConverter = ({ comment }: CommentLocaleConverterProps) => {
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
