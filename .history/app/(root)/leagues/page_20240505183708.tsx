import AddressSearch from "@/components/shared/AddressSearch";
import CategoryFilter from "@/components/shared/CategoryFilter";
import LeagueCollection from "@/components/shared/LeagueCollection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getLeagues } from "@/lib/actions/league.action";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const Leagues = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const nameSearchText = (searchParams?.nameQuery as string) || "";
  const category = (searchParams?.category as string) || "";

  const leagues = await getLeagues({
    page,
    query: searchText,
    nameQuery: nameSearchText,
    category,
    limit: 6,
  });

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

      <section
        id="leagues"
        className="wrapper bg-blue my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="flex w-full flex-col gap-5 md:flex-row ">
          <Search placeholder="Search League Name" />
          <AddressSearch />
          <CategoryFilter />
        </div>

        <LeagueCollection
          data={leagues?.data}
          emptyTitle="No Leagues Found"
          emptyStateSubtext="Check again later"
          limit={6}
          page={page}
          totalPages={leagues?.totalPages}
        />
      </section>
    </>
  );
};

export default Leagues;
