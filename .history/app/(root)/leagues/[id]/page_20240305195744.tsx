import { SearchParamProps } from "@/types";
import { getLeagueById } from "@/lib/actions/league.action";
import { auth } from "@clerk/nextjs";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  const league = await getLeagueById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return <div className="text-white">{id}</div>;
};

export default LeagueDetails;
