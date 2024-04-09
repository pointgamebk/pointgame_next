import TableLocaleConverter from "@/components/shared/TableLocaleConverter";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { formatDateTime } from "@/lib/utils";
import { ProfileProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ params: { id } }: ProfileProps) => {
  const { sessionClaims } = auth();

  //Session user id
  const sessionUserId = sessionClaims?.userId as string;

  //Profile user id
  const user = await getUserById(id);

  const gamesJoined = user.gamesJoined;
  const gamesOrganized = user.gamesOrganized;

  return (
    <>
      {/* My Joins */}
      {sessionUserId === id && (
        <section className=" bg-dotted-pattern bg-cover bg-center py-5">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className="h3-bold text-center sm:text-left text-white">
              Games Joined
            </h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/#events">Explore More Games</Link>
            </Button>
          </div>
        </section>
      )}
      {sessionUserId === id && (
        <section className="wrapper py-8">
          <div className="wrapper py-8">
            <table className="w-full border-collapse border-t">
              <thead>
                <tr className="p-medium-14 border-b text-grey-500">
                  <th className="min-w-[100px] py-3 text-left text-grey-400">
                    Game Title
                  </th>
                  <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                    Game Date
                  </th>
                  <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                    Game Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {gamesJoined.length === 0 ? (
                  <tr className="border-b">
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No games joined currently.
                    </td>
                  </tr>
                ) : (
                  <>
                    {gamesJoined.map((row: any) => (
                      <tr
                        key={row._id}
                        className="p-regular-14 lg:p-regular-16 border-b text-white"
                        style={{ boxSizing: "border-box" }}
                      >
                        <td className="min-w-[100px] py-4 text-green">
                          <Link href={`/games/${row._id}`}>{row.title}</Link>
                        </td>
                        {/* <td className="min-w-[100px] flex-1 py-4 pr-4">
                          {formatDateTime(row.startDateTime).dateTime}
                        </td> */}
                        <TableLocaleConverter row={row} />
                        <td className="min-w-[100px] flex-1 py-4 pr-4">
                          {row.location}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Games Organized */}
      <section className="bg-dotted-pattern bg-cover bg-center py-5">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left text-white">
            Games Organized
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/games/create">Create New Game</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper py-8">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Game Title
              </th>
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Game Date
              </th>
              <th className="min-w-[100px] flex-1 py-3 pr-4 text-left text-grey-400">
                Game Location
              </th>
            </tr>
          </thead>
          <tbody>
            {gamesOrganized.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No games organized currently.
                </td>
              </tr>
            ) : (
              <>
                {gamesOrganized.map((row: any) => (
                  <tr
                    key={row._id}
                    className="p-regular-14 lg:p-regular-16 border-b text-white"
                    style={{ boxSizing: "border-box" }}
                  >
                    <td className="min-w-[100px] py-4 text-green">
                      <Link href={`/games/${row._id}`}>{row.title}</Link>
                    </td>
                    <td className="min-w-[100px] flex-1 py-4 pr-4">
                      {formatDateTime(row.startDateTime).dateTime}
                    </td>
                    <td className="min-w-[100px] flex-1 py-4 pr-4">
                      {row.location}
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

export default ProfilePage;
