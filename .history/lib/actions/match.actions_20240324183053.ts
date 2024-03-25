"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";

import Match from "../database/models/match";
import { CreateMatchParams } from "@/types";
import { handleError } from "../utils";

// CREATE
export async function createMatch({ schedule, match }: CreateMatchParams) {
  try {
    await connectToDatabase();

    const newMatch = await Match.create({
      ...match,
      schedule,
    });

    console.log(newMatch);
    //revalidatePath(path);

    return JSON.parse(JSON.stringify(newMatch));
  } catch (error) {
    handleError(error);
  }
}
