"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Game from "../database/models/game.model";
import Category from "../database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateGameParams,
  UpdateGameParams,
  DeleteGameParams,
  GetAllGamesParams,
  GetGamesByUserParams,
} from "@/types";
