import LeagueLocaleUpdateForm from "@/components/shared/LeagueLocaleUpdateForm";
import { getLeagueById } from "@/lib/actions/league.action";
import { auth } from "@clerk/nextjs";

type UpdateLeagueProps = {
  params: {
    id: string;
  };
};

const UpdateLocale = async ({ params: { id } }: UpdateLeagueProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const league = await getLeagueById(id);

  const isAdmin = league.administrator._id === userId;

  return (
    <>
      <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Update League Locale
        </h3>
      </section>

      {isAdmin ? (
        <div className="wrapper my-8 md:py-20">
          <LeagueLocaleUpdateForm
            leagueId={id}
            locale={league.locale}
            path={`/leagues/${id}/update_locale`}
          />
        </div>
      ) : null}
    </>
  );
};

export default UpdateLocale;
