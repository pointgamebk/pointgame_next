"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { ISchedule } from "../database/models/schedule";
import { CreateScheduleParams } from "@/types";

// CREATE
export const createSchedule = async ({
  leagueId,
  schedule,
}: CreateScheduleParams) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    const newSchedule = await Team.create({
      ...team,
      league: leagueId,
    });

    if (!newTeam) throw new Error("Team not created");

    league.teams.push(newTeam._id);

    await league.save();

    return JSON.parse(JSON.stringify(newTeam));
  } catch (error) {
    handleError(error);
  }
};
