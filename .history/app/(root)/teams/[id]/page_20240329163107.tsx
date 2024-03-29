import { SearchParamProps } from "@/types";
import { getTeamById } from "@/lib/actions/team.actions";
import { auth } from "@clerk/nextjs";
import UserSearch from "@/components/shared/UserSearch";
import Link from "next/link";
import { DeletePlayerConfirmation } from "@/components/shared/DeletePlayerConfirmation";

const TeamDetails = async ({ params: { id } }: SearchParamProps) => {
  const team = await getTeamById(id);
  const players = team?.players;

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isAdmin = team?.league.administrator === userId;

  type IPlayer = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{team.name}</h2>
          </div>
          <div>
            <Link
              className="text-green text-bold"
              href={`/leagues/${team.league._id}`}
            >
              Back to League
            </Link>
          </div>
        </div>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <div className="mb-5">
          <h2 className="h2-bold text-white">Players</h2>
        </div>
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="max-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Username
              </th>
              <th className="max-w-[75px] py-3 text-left text-grey-400">
                First
              </th>
              <th className="max-w-[75px] py-3 text-left text-grey-400">
                Last
              </th>
              {isAdmin && (
                <th className="min-w-[50px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Edit
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {team && players.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No players joined.
                </td>
              </tr>
            ) : (
              <>
                {team &&
                  players.map((row: IPlayer) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.username}
                      </td>
                      <td className="min-w-[150px] py-4">{row.firstName}</td>
                      <td className="min-w-[150px] py-4">{row.lastName}</td>
                      {isAdmin && (
                        <td className="min-w-[200px] flex-1 py-4 pr-4 text-red-600">
                          <DeletePlayerConfirmation
                            teamId={id}
                            userId={row._id}
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

      {isAdmin && (
        <section className="wrapper overflow-x-auto text-tan">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <UserSearch teamId={id} leagueId={team.league._id} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TeamDetails;
