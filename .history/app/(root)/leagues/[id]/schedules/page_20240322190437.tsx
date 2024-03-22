type ScheduleDetailsProps = {
  params: {
    id: string;
  };
};
const SchedulePage = async ({ params: { id } }: ScheduleDetailsProps) => {
  return <h1>{id}</h1>;
};

export default SchedulePage;
