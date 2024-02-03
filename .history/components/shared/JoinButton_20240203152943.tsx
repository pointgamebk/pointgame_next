"use client";

import { useEffect, useState } from "react";
import { IGame } from "@/lib/database/models/game.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { createJoin } from "@/lib/actions/join.actions";
import { getJoinsByGame, deleteJoin } from "@/lib/actions/join.actions";
import { get } from "http";
import { is } from "date-fns/locale";
import { IJoin } from "@/lib/database/models/join.model";
import { set } from "mongoose";

//import Checkout from "./Checkout";

const JoinButton = ({ game }: { game: IGame }) => {
  const [joins, setJoins] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [joinId, setJoinId] = useState("");
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
        setJoins(joins);

        if (joins.length > 0) {
          const isJoined = joins.some(
            (join: IJoin) => join.player._id === userId
          );
          const join = joins.find((join: IJoin) => join.player._id === userId);
          console.log(join);
        }
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
              {isJoined ? "Joined" : "Join Game"}
            </Button>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default JoinButton;
