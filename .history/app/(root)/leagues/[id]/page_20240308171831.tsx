import { SearchParamProps } from "@/types";
import { getLeagueById } from "@/lib/actions/league.action";
import { auth } from "@clerk/nextjs";
import TeamForm from "@/components/shared/TeamForm";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  const league = await getLeagueById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  type ITeam = {
    _id: string;
    name: string;
  };

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{league.name}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-white/30 px-4 py-2.5 text-white">
                  {league.category.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-white">Admin:</p>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-green">
                <span className="text-green">
                  {league.administrator.firstName}{" "}
                  {league.administrator.lastName}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-white">League Details:</p>
            <p className="p-medium-16 lg:p-regular-18 text-white">
              {league.description}
            </p>
          </div>
        </div>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left text-tan">Team ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-tan">
                Team Name
              </th>
            </tr>
          </thead>
          <tbody>
            {league && league.teams.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No teams currently.
                </td>
              </tr>
            ) : (
              <>
                {league &&
                  league.teams.map((row: IPlayer) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-green">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.username}
                      </td>
                      <td className="min-w-[150px] py-4">{row.firstName}</td>
                      <td className="min-w-[150px] py-4">{row.lastName}</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {league.administrator._id === userId && <TeamForm leagueId={id} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeagueDetails;