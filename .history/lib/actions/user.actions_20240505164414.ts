"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Game from "@/lib/database/models/game.model";
import Team from "../database/models/team.model";
import { handleError } from "@/lib/utils";

import { CreateUserParams, UpdateUserParams } from "@/types";

import League from "../database/models/league.model";
import Comment from "../database/models/comment.model";

const populateUser = (query: any) => {
  return query
    .populate({
      path: "gamesJoined",
      model: Game,
      select: "_id title startDateTime endDateTime location",
    })
    .populate({
      path: "gamesOrganized",
      model: Game,
      select: "_id title startDateTime endDateTime location",
    });
};

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await populateUser(User.findById(userId));

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  const commish_id = "660886ceb8db48e3e294acc3";
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'games' collection to remove references to the user
      Game.deleteMany({ organizer: userToDelete._id }),

      // Update Game 'joins' array to remove references to the user
      Game.updateMany(
        { joins: userToDelete._id },
        { $pull: { joins: userToDelete._id } }
      ),

      // Update the 'comments' collection to remove references to the user
      Comment.deleteMany({ user: userToDelete._id }),

      // Update the 'teams' collection to remove references to the user
      Team.updateMany(
        { players: userToDelete._id },
        { $pull: { players: userToDelete._id } }
      ),

      // Update the 'leagues' collection to remove references to the user and set the commish as the admin
      League.updateMany(
        { administrator: userToDelete._id },
        { administrator: commish_id }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserByUserName(username: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({
      username,
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
