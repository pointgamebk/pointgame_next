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
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain"></section>
    </>
  );
};

export default SchedulePage;
