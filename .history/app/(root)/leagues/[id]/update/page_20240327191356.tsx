import LeagueUpdateForm from "@/components/shared/LeagueUpdateForm";
import { auth } from "@clerk/nextjs";

type UpdateLeagueProps = {
  params: {
    id: string;
  };
};

const UpdateLeague = async ({ params: { id } }: UpdateLeagueProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
};
