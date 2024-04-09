"use client";

import { IMatch } from "@/lib/database/models/match.model";
import { formatDateTime } from "@/lib/utils";

type TableLocaleConverterProps = {
  row: IMatch;
};

const TableLocaleConverter = ({ row }: TableLocaleConverterProps) => {
  return (
    <td className="min-w-[100px] py-4 text-green">
      {formatDateTime(row.startDateTime).dateTime}
    </td>
  );
};

export default TableLocaleConverter;
