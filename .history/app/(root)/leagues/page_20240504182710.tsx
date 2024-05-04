import AddressSearch from "@/components/shared/AddressSearch";
import LeagueCollection from "@/components/shared/LeagueCollection";
import { Button } from "@/components/ui/button";
import { getLeagues } from "@/lib/actions/league.action";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const Leagues = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";

  const leagues = await getLeagues({ page, query: searchText, limit: 6 });

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">Rec Leagues</h2>
          </div>
          <div className="max-w-[275px]">
            <Button asChild size="sm" className="button">
              <Link href="/leagues/create">Add League</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wrapper mt-8">
        <AddressSearch />
      </section>

      <section
        id="leagues"
        className="wrapper bg-blue my-8 flex flex-col gap-8 md:gap-12"
      ></section>

      <LeagueCollection
        data={leagues?.data}
        emptyTitle="No Leagues Found"
        emptyStateSubtext="Check again later"
        limit={6}
        page={page}
        totalPages={leagues?.totalPages}
      />
    </>
  );
};

export default Leagues;
