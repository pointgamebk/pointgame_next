"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { ISchedule } from "../database/models/schedule";
import { CreateScheduleParams } from "@/types";
import Schedule from "../database/models/schedule";

// CREATE
export const createSchedule = async ({
  leagueId,
  schedule,
}: CreateScheduleParams) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    const newSchedule = await Schedule.create({
      ...schedule,
      league: leagueId,
    });

    if (!newSchedule) throw new Error("Schedule not created");

    league.schedules.push(newSchedule._id);

    await league.save();

    return JSON.parse(JSON.stringify(newSchedule));
  } catch (error) {
    handleError(error);
  }
};

// SCHEDULE BY ID
export async function getScheduleById(scheduleId: string) {
  try {
    await connectToDatabase();

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) throw new Error("Schedule not found");

    return JSON.parse(JSON.stringify(schedule));
  } catch (error) {
    handleError(error);
  }
}
