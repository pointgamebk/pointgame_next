import AddressSearch from "@/components/shared/AddressSearch";
import Collection from "@/components/shared/Collection";
import LeagueCollection from "@/components/shared/LeagueCollection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getLeagues } from "@/lib/actions/league.action";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const Leagues = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const searchString = searchText;
  const limit = 3;

  const leagues = await getLeagues({ page, searchString, limit });

  const truncateCountry = (str: string) => {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      return str.substring(0, lastCommaIndex);
    }
    return str;
  };

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

      {/* <section className="wrapper mt-8">
        <Search placeholder="Filter leagues by location..." />
      </section> */}

      <div className="flex w-full flex-col gap-5 md:flex-row ">
        <AddressSearch />
      </div>

      <section
        id="events"
        className="wrapper bg-blue my-8 flex flex-col gap-8 md:gap-12"
      ></section>

      <LeagueCollection
        data={leagues?.data}
        emptyTitle="No Leagues Found"
        emptyStateSubtext="Check again later"
        limit={limit}
        page={page}
        totalPages={leagues?.totalPages}
      />

      {/* <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[90px] py-3 text-left text-grey-400">
                League Name
              </th>
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Based In
              </th>
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Sport
              </th>
            </tr>
          </thead>
          <tbody>
            {leagues && leagues.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No leagues currently.
                </td>
              </tr>
            ) : (
              <>
                {leagues &&
                  leagues.map((row: any) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[100px] py-4 text-green">
                        <Link href={`/leagues/${row._id}`}>{row.name}</Link>
                      </td>
                      <td className="min-w-[90px] flex-1 p-medium-14 py-4 pr-4">
                        {truncateCountry(row.locale)}
                      </td>
                      <td className="min-w-[100px] flex-1  py-4 pr-4">
                        {row.category.name}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section> */}
    </>
  );
};

export default Leagues;
