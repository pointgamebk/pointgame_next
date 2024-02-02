import Search from "@/components/shared/Search";
import { getJoinsByGame } from "@/lib/actions/join.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IJoinItem } from "@/lib/database/models/join.model";

const Joins = async ({ searchParams }: SearchParamProps) => {
  const gameId = (searchParams?.gameId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const joins = await getJoinsByGame({ gameId, searchString: searchText });

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Players</h3>
      </section>

      {/* <section className="wrapper mt-8">
        <Search placeholder="Search player name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Join ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Game Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Player</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {joins && joins.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No players found.
                </td>
              </tr>
            ) : (
              <>
                {joins &&
                  joins.map((row: IJoinItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.gameTitle}
                      </td>
                      <td className="min-w-[150px] py-4">{row.player}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
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

export default Joins;
