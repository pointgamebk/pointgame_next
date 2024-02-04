"use client";

import { useEffect, useState } from "react";
import { IGame } from "@/lib/database/models/game.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { createJoin } from "@/lib/actions/join.actions";
import { getJoinsByGame, deleteJoin } from "@/lib/actions/join.actions";
import { IJoin } from "@/lib/database/models/join.model";

import { useRouter } from "next/navigation";

//import Checkout from "./Checkout";

const JoinButton = ({ game }: { game: IGame }) => {
  const [joins, setJoins] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [joinId, setJoinId] = useState("");
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasGameFinished = new Date(game.endDateTime) < new Date();

  const router = useRouter();

  useEffect(() => {
    const fetchJoins = async () => {
      try {
        const joins = await getJoinsByGame({
          gameId: game._id,
          searchString: "",
        });
        setJoins(joins);

        if (joins.length > 0) {
          const isJoined = joins.some(
            (join: IJoin) => join.player._id === userId
          );
          if (isJoined) {
            setIsJoined(true);
            const join = joins.find(
              (join: IJoin) => join.player._id === userId
            );
            setJoinId(join._id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJoins();
  }, []);

  const onSubmit = async () => {
    if (!isJoined) {
      try {
        const join = await createJoin({
          gameId: game._id,
          playerId: userId,
          createdAt: new Date(),
        });
        router.push(`/`);
        console.log(join);
        // if (join) {
        //   console.log(join);
        // }
      } catch (error) {
        console.log(error);
      }
    }

    if (isJoined) {
      try {
        const deletedJoin = await deleteJoin(joinId);
        // if (join) {
        //   console.log(deletedJoin);
        // }
        router.push(`/`);
      } catch (error) {
        console.log(error);
      }
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
              {isJoined ? "Joined" : "Join Game"}
            </Button>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default JoinButton;
