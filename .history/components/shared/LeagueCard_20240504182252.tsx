import { ILeague } from "@/lib/database/models/league.model";
import { Separator } from "../ui/separator";

type LeagueCardProps = {
  league: ILeague;
};

const LeagueCard = ({ league }: LeagueCardProps) => {
  const truncateCountry = (str: string) => {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      return str.substring(0, lastCommaIndex);
    }
    return str;
  };

  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="flex-between w-full py-3">
        <p className="font-semibold pl-5 p-medium-16 text-black">
          {league.name}
        </p>
      </div>

      <div className="px-2">
        <Separator className="border border-grey-500" />
      </div>

      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">
          {league.category.name}
        </p>
      </div>

      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">
          {truncateCountry(league.locale)}
        </p>
      </div>
    </div>
  );
};

export default LeagueCard;
