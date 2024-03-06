import { SearchParamProps } from "@/types";
import { getTeamById } from "@/lib/actions/team.actions";
import { auth } from "@clerk/nextjs";

const TeamDetails = async ({ params: { id } }: SearchParamProps) => {
  return <div>TeamDetails</div>;
};

export default TeamDetails;
