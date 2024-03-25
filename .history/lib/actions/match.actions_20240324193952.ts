"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";

import Match from "../database/models/match.model.";
import { CreateMatchParams } from "@/types";
import { handleError } from "../utils";
import test from "node:test";
import { getScheduleById } from "./schedule.actions";

// CREATE
export async function createMatch({ scheduleId, match }: CreateMatchParams) {
  try {
    await connectToDatabase();

    const schedule = await getScheduleById(scheduleId);

    const newMatch = await Match.create({
      ...match,
      schedule: scheduleId,
    });

    if (!newMatch) throw new Error("Match not created");

    console.log(newMatch);

    console.log(schedule);

    //schedule.matches.push(newMatch._id);

    //await schedule.save();

    //revalidatePath(path);

    return JSON.parse(JSON.stringify(newMatch));
  } catch (error) {
    handleError(error);
  }
}
