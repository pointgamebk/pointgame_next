import { SearchParamProps } from "@/types";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  return <div className="text-tan">{id}</div>;
};

export default LeagueDetails;
