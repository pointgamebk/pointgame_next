"use client";

import { IMatch } from "@/lib/database/models/match.model";
import { formatDateTime } from "@/lib/utils";

type MatchLocaleConverterProps = {
  match: IMatch;
};

const MatchLocaleConverter = ({ match }: MatchLocaleConverterProps) => {
  return (
    <>
      <td className="min-w-[100px] py-4 text-green">
        {formatDateTime(row.startDateTime).dateTime}
      </td>
    </>
  );
};
