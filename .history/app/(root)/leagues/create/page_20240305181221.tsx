import { auth } from "@clerk/nextjs";
import LeagueForm from "@/components/shared/LeagueForm";

const CreateLeague = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Create League
        </h3>
      </section>

      <div className="wrapper my-8">
        <LeagueForm userId={userId} />
      </div>
    </>
  );
};

export default CreateLeague;
