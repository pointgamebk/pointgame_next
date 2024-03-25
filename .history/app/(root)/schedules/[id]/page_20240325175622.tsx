import { getScheduleById } from "@/lib/actions/schedule.actions";
import { getMatchesByScheduleId } from "@/lib/actions/match.actions";
import { IMatch } from "@/lib/database/models/match.model.";
import MatchForm from "@/components/shared/MatchForm";
import { ISchedule } from "@/lib/database/models/schedule.model";

type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};

const ScheduleDetails: React.FC<ScheduleDetailsProps> = async ({
  params: { id },
}) => {
  const schedule = await getScheduleById(id);
  const leagueId = schedule.league;
  //const matches = schedule.matches;
  const matches = await getMatchesByScheduleId(id);

  console.log(matches);

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{schedule.name}</h2>
          </div>
        </div>
      </section>

      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <MatchForm scheduleId={id} leagueId={leagueId} />
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left text-tan">Team 1</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-tan">
                Team 2
              </th>
              <th className="min-w-[150px] py-3 text-left text-tan">Winner</th>
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
                  matches.map((row: ISchedule) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-green">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.matches[0].teamOne.name} vs{" "}
                        {row.matches[0].teamTwo.name}
                      </td>
                      {/* <td className="min-w-[150px] py-4">{row.winner?.name}</td> */}
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
