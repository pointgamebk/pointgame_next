"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { CreateScheduleParams } from "@/types";
import Schedule from "../database/models/schedule.model";
import Match from "../database/models/match.model.";
import { revalidatePath } from "next/cache";

// CREATE
export const createSchedule = async ({
  leagueId,
  schedule,
  path,
}: CreateScheduleParams) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    const newSchedule = await Schedule.create({
      ...schedule,
      league: leagueId,
    });

    revalidatePath(path);

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

// DELETE SCHEDULE
export async function deleteSchedule(scheduleId: string, leagueId: string) {
  try {
    await connectToDatabase();

    const scheduleToDelete = await Schedule.findOne({ _id: scheduleId });
    console.log(scheduleToDelete);
    if (!scheduleToDelete) throw new Error("Schedule not found");

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Match.updateMany(
        { _id: { $in: scheduleToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
  } catch (error) {
    handleError(error);
  }
}
