"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { ITeam } from "../database/models/team.model";
import { CreateTeamParams } from "@/types";
import Team from "../database/models/team.model";
import User from "../database/models/user.model";

const populateTeam = (query: any) => {
  return query
    .populate({
      path: "players",
      model: User,
      select: "_id username firstName lastName",
    })
    .populate({
      path: "administrator",
      model: User,
      select: "_id",
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

    if (!newTeam) throw new Error("Team not created");

    league.teams.push(newTeam._id);

    await league.save();

    return JSON.parse(JSON.stringify(newTeam));
  } catch (error) {
    handleError(error);
  }
};

// TEAM BY ID
export async function getTeamById(teamId: string) {
  try {
    await connectToDatabase();

    const team = await populateTeam(Team.findById(teamId));

    if (!team) throw new Error("Team not found");

    return JSON.parse(JSON.stringify(team));
  } catch (error) {
    handleError(error);
  }
}

// ADD PLAYER TO TEAM
export async function addPlayerToTeam(teamId: string, userId: string) {
  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);

    if (!team) throw new Error("Team not found");

    // Push the ID of the user you want to add to the `players` array
    team.players.push(userId);

    // Save the updated Team document
    await team.save();
  } catch (error) {
    handleError(error);
  }
}

export const deleteTeam = async (teamId: string, leagueId: string) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    // DELETE TEAM INSTANCE
    await Team.findByIdAndDelete(teamId);

    // REMOVE TEAM FROM LEAGUE
    league.teams = league.teams.filter((t: ITeam) => t.toString() !== teamId);
    await league.save();
  } catch (error) {
    handleError(error);
  }
};

export const removePlayerFromTeam = async (teamId: string, userId: string) => {
  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);
    if (!team) throw new Error("Team not found");

    // REMOVE PLAYER FROM TEAM
    team.players = team.players.filter((p: string) => p.toString() !== userId);
    await team.save();
  } catch (error) {
    handleError(error);
  }
};
