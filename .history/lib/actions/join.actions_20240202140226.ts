"use server";

import {
  SubmitJoinParams,
  CreateJoinParams,
  GetJoinsByGameParams,
  GetJoinsByUserParams,
} from "@/types";

import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Join from "../database/models/join.model";
import Game from "../database/models/game.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";

export const createJoin = async (join: CreateJoinParams) => {
  try {
    await connectToDatabase();

    const newJoin = await Join.create({
      ...join,
      game: join.gameId,
      player: join.playerId,
    });

    return JSON.parse(JSON.stringify(newJoin));
  } catch (error) {
    handleError(error);
  }
};
