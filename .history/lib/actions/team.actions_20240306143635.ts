"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";

import { CreateTeamParams } from "@/types";
import Team from "../database/models/team.model";

const populateTeam = (query: any) => {
  return query.populate({
    path: "league",
    model: League,
    select: "_id name",
  });
};

// CREATE
export const createTeam = async ({ leagueId, team }: CreateTeamParams) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    const newTeam = await Team.create({
      ...team,
      league: leagueId,
    });

    return JSON.parse(JSON.stringify(newTeam));
  } catch (error) {
    handleError(error);
  }
};

// TEAM BY ID
export async function getTeamById(teamId: string) {
  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);
    if (!team) throw new Error("League not found");

    console.log(team);

    return JSON.parse(JSON.stringify(team));
  } catch (error) {
    handleError(error);
  }
}
