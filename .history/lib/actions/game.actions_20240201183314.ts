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
