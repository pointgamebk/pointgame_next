import { ILeague } from "@/lib/database/models/league.model";
import { auth } from "@clerk/nextjs";
import { Separator } from "../ui/separator";

type LeagueCardProps = {
  league: ILeague;
};

const LeagueCard = ({ league }: LeagueCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
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
    </div>
  );
};

export default LeagueCard;
