"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import League, { ILeague } from "../database/models/league.model";
import User from "../database/models/user.model";
import { handleError } from "@/lib/utils";
import Schedule from "../database/models/schedule.model";
import { CreateLeagueParams } from "@/types";
import Category from "../database/models/category.model";
import Team from "../database/models/team.model";

const populateLeague = (query: any) => {
  return query
    .populate({
      path: "administrator",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" })
    .populate({ path: "teams", model: Team, select: "_id name" })
    .populate({ path: "schedules", model: Schedule, select: "_id name" });
};

// CREATE
export const createLeague = async ({
  userId,
  league,
  path,
}: CreateLeagueParams) => {
  try {
    await connectToDatabase();

    const administrator = await User.findById(userId);
    if (!administrator) throw new Error("Administrator not found");

    const newLeague = await League.create({
      ...league,
      category: league.category,
      administrator: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newLeague));
  } catch (error) {
    handleError(error);
  }
};

// LEAGUE BY ID
export async function getLeagueById(leagueId: string) {
  try {
    await connectToDatabase();

    const league = await populateLeague(League.findById(leagueId));
    if (!league) throw new Error("League not found");

    return JSON.parse(JSON.stringify(league));
  } catch (error) {}
}

// LEAGUES
export async function getLeagues() {
  try {
    await connectToDatabase();

    const leagues = await populateLeague(League.find());

    if (!leagues) throw new Error("Leagues not found");

    return JSON.parse(JSON.stringify(leagues));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE LEAGUE DESCRIPTION
export async function updateLeagueDescription(
  leagueId: string,
  description: string,
  path: string
) {
  try {
    await connectToDatabase();

    const league = await League.findByIdAndUpdate(leagueId, { description });

    if (!league) throw new Error("League not found");

    revalidatePath(path);

    return JSON.parse(JSON.stringify(league));
  } catch (error) {
    handleError(error);
  }
}
