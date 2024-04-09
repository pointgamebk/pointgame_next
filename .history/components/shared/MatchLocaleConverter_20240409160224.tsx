"use client";

import { IMatch } from "@/lib/database/models/match.model";
import { formatDateTime } from "@/lib/utils";

type MatchLocaleConverterProps = {
  match: IMatch;
};

const MatchLocaleConverter = ({ match }: MatchLocaleConverterProps) => {
  return (
    <>
      <p className="p-medium-16 p-medium-18 text-grey-500">
        {formatDateTime(match.startDateTime).dateTime}
      </p>
      <p className="p-medium-16 p-medium-18 text-grey-500">
        {formatDateTime(match.endDateTime).dateTime}
      </p>
    </>
  );
};
