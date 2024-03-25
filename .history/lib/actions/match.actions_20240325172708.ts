"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";

import Match from "../database/models/match.model.";
import { CreateMatchParams } from "@/types";
import { handleError } from "../utils";
import test from "node:test";
import { getScheduleById } from "./schedule.actions";
import Schedule from "../database/models/schedule.model";

// CREATE
export async function createMatch({ scheduleId, match }: CreateMatchParams) {
  try {
    await connectToDatabase();

    const schedule = Schedule.findById(scheduleId);
    if (!schedule) throw new Error("Schedule not found");

    const newMatch = await Match.create({
      ...match,
      schedule: scheduleId,
    });
    if (!newMatch) throw new Error("Match not created");

    schedule.matches.push(newMatch._id);
    //revalidatePath(path);

    return JSON.parse(JSON.stringify(newMatch));
  } catch (error) {
    handleError(error);
  }
}

// MATCH BY SCHEDULE ID
export async function getMatchesByScheduleId(scheduleId: string) {
  try {
    await connectToDatabase();

    const matches = await Match.find({ schedule: scheduleId });
    if (!matches) throw new Error("Matches not found");

    return JSON.parse(JSON.stringify(matches));
  } catch (error) {
    handleError(error);
  }
}
