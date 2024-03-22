import { getLeagueById } from "@/lib/actions/league.action";

type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};
const SchedulePage = async ({ params: { id } }: ScheduleDetailsProps) => {
  const league = await getLeagueById(id);

  const schedule = league.schedules[0];
  return <h1 className="h1-bold text-white">{schedule.name}</h1>;
};

export default SchedulePage;
