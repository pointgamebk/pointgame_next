"use client";

import { IMatch } from "@/lib/database/models/match.model";
import { formatDateTime } from "@/lib/utils";

type MatchLocaleConverterProps = {
  row: IMatch;
};

const MatchLocaleConverter = ({ row }: MatchLocaleConverterProps) => {
  return (
    <td className="min-w-[125px] p-medium-14  pr-4 text-white">
      {formatDateTime(row.startDateTime).dateTime}
    </td>
  );
};

export default MatchLocaleConverter;
