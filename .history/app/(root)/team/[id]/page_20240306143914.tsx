import { SearchParamProps } from "@/types";
import { getTeamById } from "@/lib/actions/team.actions";
import { auth } from "@clerk/nextjs";

const TeamDetails = async ({ params: { id } }: SearchParamProps) => {
  const team = await getTeamById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return <div>TeamDetails</div>;
};

export default TeamDetails;
