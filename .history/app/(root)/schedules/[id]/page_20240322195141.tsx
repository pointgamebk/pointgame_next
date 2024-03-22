import { getScheduleById } from "@/lib/actions/schedule.actions";

type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};

const ScheduleDetails = async ({ params: { id } }: ScheduleDetailsProps) => {
  const schedule = await getScheduleById(id);

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
