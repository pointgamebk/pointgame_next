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
    </>
  );
};

export default Leagues;
