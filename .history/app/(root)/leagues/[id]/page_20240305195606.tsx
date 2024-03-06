import { SearchParamProps } from "@/types";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  return <div className="text-white">{id}</div>;
};

export default LeagueDetails;
