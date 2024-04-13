import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getLeagues, _getLeagues } from "@/lib/actions/league.action";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const Leagues = async ({ searchParams }: SearchParamProps) => {
  const searchText = (searchParams?.query as string) || "";

  const leagues = await _getLeagues();

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">Rec Leagues</h2>
          </div>
          <div className="max-w-[275px]">
            <Button asChild size="sm" className="button">
              <Link href="/leagues/create">Create New League</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Filter by location..." />
      </section>

      <section className="wrapper overflow-x-auto text-tan">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] py-3 text-left text-grey-400">
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
                      <td className="min-w-[100px] flex-1 p-medium-14 py-4 pr-4">
                        {row.locale}
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
      </section>
    </>
  );
};

export default Leagues;
