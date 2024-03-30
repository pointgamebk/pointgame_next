import { auth } from "@clerk/nextjs";
import { getScheduleById } from "@/lib/actions/schedule.actions";
import { getMatchesByScheduleId } from "@/lib/actions/match.actions";
import { getLeagueById } from "@/lib/actions/league.action";
import { IMatch } from "@/lib/database/models/match.model";
import MatchForm from "@/components/shared/MatchForm";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { SelectWinner } from "@/components/shared/SelectWinner";
import { DeleteMatchConfirmation } from "@/components/shared/DeleteMatchConfirmation";

type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};

const ScheduleDetails: React.FC<ScheduleDetailsProps> = async ({
  params: { id },
}) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const schedule = await getScheduleById(id);
  const leagueId = schedule.league;
  const league = await getLeagueById(leagueId);
  const matches = await getMatchesByScheduleId(id);

  const isAdmin = league.administrator._id === userId;

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{schedule.name}</h2>
          </div>

          <div>
            <Link
              className="text-green text-bold"
              href={`/leagues/${leagueId}`}
            >
              Back to League
            </Link>
          </div>
        </div>
      </section>

      {isAdmin && (
        <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
          <MatchForm scheduleId={id} leagueId={leagueId} />
        </section>
      )}

      <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Team 1
              </th>
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Team 2
              </th>
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Game Date
              </th>
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Winner
              </th>
              {isAdmin && (
                <th className="min-w-[100px] py-3 text-left text-grey-400">
                  Edit
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {matches.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No scheduled matches.
                </td>
              </tr>
            ) : (
              <>
                {matches &&
                  matches.map((row: IMatch) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[100px] flex-1 py-4 pr-4 text-green">
                        {isAdmin ? (
                          <SelectWinner
                            matchId={row._id}
                            name={row.teamOne.name}
                            teamId={row.teamOne._id}
                            path={`/schedules/${id}`}
                          />
                        ) : (
                          row.teamOne.name
                        )}
                      </td>
                      <td className="min-w-[100px] flex-1 py-4 pr-4 text-green">
                        {isAdmin ? (
                          <SelectWinner
                            matchId={row._id}
                            name={row.teamTwo.name}
                            teamId={row.teamTwo._id}
                            path={`/schedules/${id}`}
                          />
                        ) : (
                          row.teamTwo.name
                        )}
                      </td>
                      <td className="min-w-[100px] py-4 text-green">
                        {formatDateTime(row.startDateTime).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-green">
                        {row.winner?.name ? row.winner.name : "TBD"}
                      </td>
                      {isAdmin && (
                        <td className="min-w-[100px] py-4 text-red-600">
                          <DeleteMatchConfirmation
                            matchId={row._id}
                            path={`/schedules/${id}`}
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

export default ScheduleDetails;
