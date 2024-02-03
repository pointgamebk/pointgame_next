"use client";

import { useEffect, useState } from "react";
import { IGame } from "@/lib/database/models/game.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { createJoin } from "@/lib/actions/join.actions";
import { getJoinsByGame } from "@/lib/actions/join.actions";
import { get } from "http";

//import Checkout from "./Checkout";

const JoinButton = ({ game }: { game: IGame }) => {
  const [joined, setJoined] = useState(null);
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasGameFinished = new Date(game.endDateTime) < new Date();

  useEffect(() => {
    const fetchJoins = async () => {
      try {
        const joins = await getJoinsByGame({
          gameId: game._id,
          searchString: "",
        });
        //console.log(joins);
        const joined = joins.find((join: any) => join.player._id === userId);
        setJoined(joined);
        //console.log(joined);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJoins();
  }, []);

  const onSubmit = async () => {
    try {
      const join = await createJoin({
        gameId: game._id,
        playerId: userId,
        createdAt: new Date(),
      });

      if (join) {
        console.log(join);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-3">
      {/* CANNOT JOIN PAST GAME  */}
      {hasGameFinished ? (
        <p className="p-2 text-red-400">
          Sorry, this game has already finished
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Join Game</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Button
              className="button rounded-full"
              size="lg"
              onClick={onSubmit}
            >
              {joined ? "Joined" : "Join Game"}
            </Button>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default JoinButton;
