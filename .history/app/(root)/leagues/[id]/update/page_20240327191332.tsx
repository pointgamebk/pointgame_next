import LeagueUpdateForm from "@/components/shared/LeagueUpdateForm";
import { auth } from "@clerk/nextjs";

type UpdateLeagueProps = {
  params: {
    id: string;
  };
};

const UpdateLeague = async ({ params: { id } }: UpdateLeagueProps) => {};
