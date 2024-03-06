import { SearchParamProps } from "@/types";
import { getTeamById } from "@/lib/actions/team.actions";
import { auth } from "@clerk/nextjs";

const TeamDetails = async ({ params: { id } }: SearchParamProps) => {
  const team = await getTeamById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{team.name}</h2>

            {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-white/30 px-4 py-2.5 text-white">
                  {league.category.name}
                </p>
              </div>
            </div> */}

            {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-white">Admin:</p>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-green">
                <span className="text-green">
                  {league.administrator.firstName}{" "}
                  {league.administrator.lastName}
                </span>
              </p>
            </div> */}
          </div>

          {/* <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {league.administrator._id === userId && (
                <TeamForm leagueId={id} />
              )}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default TeamDetails;
