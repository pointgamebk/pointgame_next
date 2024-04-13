import LeagueUpdateForm from "@/components/shared/LeagueUpdateForm";
import { getLeagueById } from "@/lib/actions/league.action";
import { auth } from "@clerk/nextjs";

type UpdateLeagueProps = {
  params: {
    id: string;
  };
};

const UpdateLeague = async ({ params: { id } }: UpdateLeagueProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const league = await getLeagueById(id);

  const isAdmin = league.administrator._id === userId;

  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Update League Details
        </h3>
      </section>

      {isAdmin ? (
        <div className="wrapper my-8">
          <LeagueUpdateForm
            leagueId={id}
            description={league.description}
            path={`/leagues/${id}/update`}
          />
        </div>
      ) : (
        <div className="wrapper my-8">
          <h4 className="text-white">Unauthorized route</h4>
        </div>
      )}
    </>
  );
};

export default UpdateLeague;
