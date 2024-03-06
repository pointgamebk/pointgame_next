import { SearchParamProps } from "@/types";
import { getLeagueById } from "@/lib/actions/league.action";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  const league = await getLeagueById(id);
  return <div className="text-white">{id}</div>;
};

export default LeagueDetails;
