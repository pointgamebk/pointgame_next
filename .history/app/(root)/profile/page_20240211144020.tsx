import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { getGamesByUser } from "@/lib/actions/game.actions";
import { getJoinsByUser } from "@/lib/actions/join.actions";
import { IJoin } from "@/lib/database/models/join.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const profileUser = await getUserById(id);

  const joinsPage = Number(searchParams?.ordersPage) || 1;
  const gamesPage = Number(searchParams?.eventsPage) || 1;

  const joins = await getJoinsByUser({ userId, page: joinsPage });

  const joinedGames = joins?.data?.map((join: IJoin) => join.game) || [];
  const organizedGames = await getGamesByUser({ userId, page: gamesPage });

  return (
    <>
      {/* My Joins */}
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

      <section className="wrapper py-8 ">
        <Collection
          data={joinedGames}
          emptyTitle="No games joined yet"
          emptyStateSubtext="No worries - plenty of exciting games to check out!"
          collectionType="My_Joins"
          limit={3}
          page={joinsPage}
          urlParamName="joinsPage"
          totalPages={joins?.totalPages}
        />
      </section>
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
        <Collection
          data={organizedGames?.data}
          emptyTitle="No games created yet"
          emptyStateSubtext="Go start one now!"
          collectionType="Games_Organized"
          limit={3}
          page={gamesPage}
          urlParamName="gamesPage"
          totalPages={organizedGames?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
