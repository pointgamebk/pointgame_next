import { getLeagueById } from "@/lib/actions/league.action";

type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};
const SchedulePage = async ({ params: { id } }: ScheduleDetailsProps) => {
  const league = await getLeagueById(id);
  const schedule = league.schedules[0];

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{schedule.name}</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default SchedulePage;
