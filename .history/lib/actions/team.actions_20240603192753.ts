"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { ITeam } from "../database/models/team.model";
import { CreateTeamParams } from "@/types";
import Team from "../database/models/team.model";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import Match from "../database/models/match.model";

const populateTeam = (query: any) => {
  return query
    .populate({
      path: "players",
      model: User,
      select: "_id username firstName lastName",
    })
    .populate({ path: "league", model: League, select: "_id administrator" });
};

// CREATE
export const createTeam = async ({
  leagueId,
  team,
  path,
}: CreateTeamParams) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    const newTeam = await Team.create({
      ...team,
      league: leagueId,
    });

    revalidatePath(path);

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
export async function addPlayerToTeam(
  teamId: string,
  userId: string,
  leagueId: string,
  path: string
) {
  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);
    if (!team) throw new Error("Team not found");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Push the ID of the user you want to add to the `players` array
    if (!team.players.includes(userId)) {
      // If not, push the userId into the players array
      team.players.push(userId);
    } else {
      return;
    }

    // Push the ID of the league you want to add to the `leaguesJoined` array
    if (!user.leaguesJoined.includes(leagueId)) {
      // If not, push the leagueId into the leaguesJoined array
      user.leaguesJoined.push(leagueId);
      // Save the updated Team document
      await team.save();
      // Save the updated User document
      await user.save();
    } else {
      // Save the updated Team document
      await team.save();
    }

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

//DELETE TEAM
export const deleteTeam = async (
  teamId: string,
  leagueId: string,
  path: string
) => {
  try {
    await connectToDatabase();

    const league = await League.findById(leagueId);
    if (!league) throw new Error("League not found");

    // Delete 'matches' referencing the deleted team
    await Match.deleteMany({ $or: [{ teamOne: teamId }, { teamTwo: teamId }] });

    // Delete team instance
    await Team.findByIdAndDelete(teamId);

    // Remove the team from the league
    league.teams = league.teams.filter((t: ITeam) => t.toString() !== teamId);
    await league.save();

    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

// REMOVE PLAYER FROM TEAM
export const removePlayerFromTeam = async (
  teamId: string,
  userId: string,
  path: string
) => {
  try {
    await connectToDatabase();

    const team = await Team.findById(teamId);
    if (!team) throw new Error("Team not found");

    // REMOVE PLAYER FROM TEAM
    team.players = team.players.filter((p: string) => p.toString() !== userId);

    await team.save();
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

// TEAMS BY LEAGUE
export async function getTeamsByLeague(leagueId: string) {
  try {
    await connectToDatabase();

    const teams = await Team.find({ league: leagueId });
    if (!teams) throw new Error("Teams not found");

    return JSON.parse(JSON.stringify(teams));
  } catch (error) {
    handleError(error);
  }
}
