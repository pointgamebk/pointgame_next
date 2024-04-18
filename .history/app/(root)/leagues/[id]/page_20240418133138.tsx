import { SearchParamProps } from "@/types";
import { getLeagueById } from "@/lib/actions/league.action";
import { auth } from "@clerk/nextjs";
import TeamForm from "@/components/shared/TeamForm";
import Link from "next/link";
import { DeleteScheduleConfirmation } from "@/components/shared/DeleteScheduleConfirmation";
import { DeleteTeamConfirmation } from "@/components/shared/DeleteTeamConfirmation";
import ScheduleForm from "@/components/shared/ScheduleForm";
import { ISchedule } from "@/lib/database/models/schedule.model";

const LeagueDetails = async ({ params: { id } }: SearchParamProps) => {
  const league = await getLeagueById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isAdmin = league.administrator._id === userId;

  const truncateCountry = (str: string) => {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      return str.substring(0, lastCommaIndex);
    }
    return str;
  };

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

            <p className="text-white">{truncateCountry(league.locale)}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-white/30 px-4 py-2.5 text-white">
                  {league.category.name}
                </p>
              </div>
            </div>

            <div>
              <Link className="text-green p-semibold-18" href={`/leagues`}>
                All Leagues
              </Link>
            </div>

            <div className="flex gap-2 sm:flex-row sm:items-center">
              <p className="p-medium-18 mt-2 sm:mt-0 text-white">Admin:</p>
              <p className="p-semibold-18  mt-2 sm:mt-0 text-green">
                {league.administrator.firstName} {league.administrator.lastName}
              </p>
            </div>

            <div className="flex gap-2 sm:flex-row sm:items-center">
              <p className="p-semibold-18 sm:mt-0 text-green">{league.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-white">League Details & Updates:</p>
            <p className="p-medium-16 lg:p-regular-18 text-white">
              {league.description}
            </p>
            {isAdmin && (
              <div className="flex flex-col max-w-[200px]">
                <Link
                  className="text-green p-semibold-14 mb-3"
                  href={`/leagues/${id}/update`}
                >
                  Edit League Details
                </Link>

                <Link
                  className="text-green p-semibold-14"
                  href={`/leagues/${id}/update_locale`}
                >
                  Edit League Locale
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <div className="mb-5">
          <h2 className="h2-bold text-white">Schedules</h2>
        </div>

        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Schedule Name
              </th>
              {isAdmin && (
                <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
                  Edit
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {league && league.schedules.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No schedules currently.
                </td>
              </tr>
            ) : (
              <>
                {league &&
                  league.schedules.map((row: ISchedule) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[100px] py-4 text-green">
                        <Link href={`/schedules/${row._id}`}>{row.name}</Link>
                      </td>

                      {isAdmin && (
                        <td className="min-w-[75px] flex-1 py-4 pr-4 text-red-600">
                          <DeleteScheduleConfirmation
                            scheduleId={row._id}
                            path={`/leagues/${id}`}
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

      <section className="wrapper overflow-x-auto text-tan">
        <div className="mb-5">
          <h2 className="h2-bold text-white">Teams</h2>
        </div>

        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Team Name
              </th>
              {isAdmin && (
                <th className="min-w-[75px] flex-1 py-3 pr-4 text-left text-grey-400">
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
                      <td className="min-w-[100px] py-4 text-green">
                        <Link href={`/teams/${row._id}`}>{row.name}</Link>
                      </td>

                      {isAdmin && (
                        <td className="min-w-[75px] flex-1 py-4 pr-4 text-red-600">
                          <DeleteTeamConfirmation
                            teamId={row._id}
                            leagueId={id}
                            path={`/leagues/${id}`}
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

      <section className="wrapper overflow-x-auto text-tan ">
        <div className="flex flex-col gap-2 mx-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {league.administrator._id === userId && <TeamForm leagueId={id} />}
          </div>
        </div>
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <div className="flex flex-col gap-2 mx-5 min-w-[300px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {league.administrator._id === userId && (
              <ScheduleForm leagueId={id} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeagueDetails;
