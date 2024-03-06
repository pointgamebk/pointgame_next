"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import User from "../database/models/user.model";
import { handleError } from "@/lib/utils";

import { CreateLeagueParams } from "@/types";

// CREATE
export const createLeague = async ({ userId, league }: CreateLeagueParams) => {
  try {
    const administrator = await User.findById(userId);
    if (!administrator) throw new Error("Administrator not found");

    const newLeague = await League.create({
      ...league,
      administrator: userId,
    });
  } catch (error) {}
};
