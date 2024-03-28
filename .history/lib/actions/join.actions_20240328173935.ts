"use server";

import { revalidatePath } from "next/cache";

import {
  CreateJoinParams,
  GetJoinsByGameParams,
  GetJoinsByUserParams,
} from "@/types";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Join from "../database/models/join.model";
import Game from "../database/models/game.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";

// CREATE JOIN
export const createJoin = async ({
  join,
  path,
}: CreateJoinParams & { join: any }) => {
  try {
    await connectToDatabase();

    const newJoin = await Join.create({
      ...join,
      game: join.gameId,
      player: join.playerId,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newJoin));
  } catch (error) {
    handleError(error);
  }
};

// GET JOINS BY GAME
export async function getJoinsByGame({
  searchString,
  gameId,
}: GetJoinsByGameParams) {
  try {
    await connectToDatabase();

    if (!gameId) throw new Error("Game ID is required");
    const gameObjectId = new ObjectId(gameId);

    const joins = await Join.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "player",
          foreignField: "_id",
          as: "player",
        },
      },
      {
        $unwind: "$player",
      },
      {
        $lookup: {
          from: "games",
          localField: "game",
          foreignField: "_id",
          as: "game",
        },
      },
      {
        $unwind: "$game",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          gameTitle: "$game.title",
          gameId: "$game._id",
          player: {
            $concat: ["$player.firstName", " ", "$player.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { gameId: gameObjectId },
            { player: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(joins));
  } catch (error) {
    handleError(error);
  }
}

// GET JOINS BY USER
export async function getJoinsByUser({
  userId,
  limit = 3,
  page,
}: GetJoinsByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { player: userId };

    const joins = await Join.distinct("game._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "game",
        model: Game,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const joinsCount = await Join.distinct("game._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(joins)),
      totalPages: Math.ceil(joinsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteJoin(joinId: string) {
  try {
    await connectToDatabase();

    const join = await Join.findByIdAndDelete(joinId);

    return JSON.parse(JSON.stringify(join));
  } catch (error) {
    handleError(error);
  }
}
