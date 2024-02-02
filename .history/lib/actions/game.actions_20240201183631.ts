"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Game from "../database/models/game.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateGameParams,
  UpdateGameParams,
  DeleteGameParams,
  GetAllGamesParams,
  GetGamesByUserParams,
  GetRelatedGamesByCategoryParams,
} from "@/types";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createEvent({ userId, game, path }: CreateGameParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newGame = await Game.create({
      ...game,
      category: game.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newGame));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getGameById(gameId: string) {
  try {
    await connectToDatabase();

    const game = await populateEvent(Game.findById(gameId));

    if (!game) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(game));
  } catch (error) {
    handleError(error);
  }
}
