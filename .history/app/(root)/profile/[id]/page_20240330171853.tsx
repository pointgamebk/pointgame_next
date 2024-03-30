import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { ProfileProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ params: { id } }: ProfileProps) => {
  const { sessionClaims } = auth();

  //Session user id
  const sessionUserId = sessionClaims?.userId as string;

  //Profile user id
  const userId = id;
  const user = await getUserById(userId);

  const gamesJoined = user.gamesJoined;
  const gamesOrganized = user.gamesOrganized;

  console.log(gamesJoined, gamesOrganized);

  return (
    <>
      {/* My Joins */}
      {sessionUserId === userId && (
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
        {/* <Collection
          data={organizedGames?.data}
          emptyTitle="No games created yet"
          emptyStateSubtext="Go start one now!"
          collectionType="Games_Organized"
          limit={3}
          page={gamesPage}
          urlParamName="gamesPage"
          totalPages={organizedGames?.totalPages}
        /> */}
      </section>
    </>
  );
};

export default ProfilePage;
