"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";

import Match from "../database/models/match.model.";
import { CreateMatchParams } from "@/types";
import { handleError } from "../utils";
import test from "node:test";

// CREATE
export async function createMatch({ scheduleId, match }: CreateMatchParams) {
  try {
    await connectToDatabase();

    const newMatch = await Match.create({
      ...match,
      schedule: scheduleId,
    });

    //revalidatePath(path);

    return JSON.parse(JSON.stringify(newMatch));
  } catch (error) {
    handleError(error);
  }
}
