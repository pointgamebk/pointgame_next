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

const populateGame = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createGame({ userId, game, path }: CreateGameParams) {
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

// GET ONE GAME BY ID
export async function getGameById(gameId: string) {
  try {
    await connectToDatabase();

    const game = await populateGame(Game.findById(gameId));

    if (!game) throw new Error("Game not found");

    return JSON.parse(JSON.stringify(game));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateGame({ userId, game, path }: UpdateGameParams) {
  try {
    await connectToDatabase();

    const gameToUpdate = await Game.findById(game._id);
    if (!gameToUpdate || gameToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or game not found");
    }

    const updatedGame = await Game.findByIdAndUpdate(
      game._id,
      { ...game, category: game.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedGame));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteGame({ gameId, path }: DeleteGameParams) {
  try {
    await connectToDatabase();

    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (deletedGame) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL GAMES
export async function getAllGames({
  query,
  limit = 6,
  page,
  category,
}: GetAllGamesParams) {
  try {
    await connectToDatabase();

    const currentDate = new Date();
    const pastDay = new Date(currentDate.getTime() - 13 * 60 * 60 * 1000);

    const locationCondition = query
      ? { location: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        locationCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
        { startDateTime: { $gte: pastDay } },
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const gamesQuery = Game.find(conditions)
      .sort({ startDateTime: "asc" })
      .skip(skipAmount)
      .limit(limit);

    const games = await populateGame(gamesQuery);
    const gamesCount = await Game.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(games)),
      totalPages: Math.ceil(gamesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET GAMES BY ORGANIZER
export async function getGamesByUser({
  userId,
  limit = 6,
  page,
}: GetGamesByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const gamesQuery = Game.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const games = await populateGame(gamesQuery);
    const gamesCount = await Game.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(games)),
      totalPages: Math.ceil(gamesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED GAMES: GAMES WITH SAME CATEGORY
export async function getRelatedGamesByCategory({
  categoryId,
  gameId,
  limit = 3,
  page = 1,
}: GetRelatedGamesByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: gameId } }],
    };

    const gamesQuery = Game.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const games = await populateGame(gamesQuery);
    const gamesCount = await Game.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(games)),
      totalPages: Math.ceil(gamesCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// ADD JOIN
export async function addJoin({
  gameId,
  userId,
  path,
}: {
  gameId: string;
  userId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    const game = await Game.findById(gameId);

    if (!game) throw new Error("Game not found");

    game.joins.push(userId);

    await game.save();

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// REMOVE JOIN
export async function removeJoin({
  gameId,
  userId,
}: {
  gameId: string;
  userId: string;
}) {
  try {
    await connectToDatabase();

    const game = await Game.findById(gameId);

    if (!game) throw new Error("Game not found");

    game.joins = game.joins.filter(
      (join: string) => join.toString() !== userId
    );

    await game.save();
  } catch (error) {
    handleError(error);
  }
}
