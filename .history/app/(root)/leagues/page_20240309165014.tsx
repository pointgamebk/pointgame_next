import { getLeagues } from "@/lib/actions/league.action";

const Leagues = () => {
  const leagues = getLeagues();
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">Rec Leagues</h2>
          </div>
        </div>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <div className="mb-5">
          <h2 className="h2-bold text-white">Teams</h2>
        </div>

        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left text-tan">
                League Name
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-tan">
                Sport
              </th>
              {isAdmin && (
                <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-tan">
                  Edit
                </th>
              )}
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
                  league.teams.map((row: ITeam) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-green">
                        <Link href={`/teams/${row._id}`}>{row._id}</Link>
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.name}
                      </td>
                      {isAdmin && (
                        <td className="min-w-[200px] flex-1 py-4 pr-4 text-red-600">
                          <DeleteTeamConfirmation
                            teamId={row._id}
                            leagueId={id}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Leagues;
