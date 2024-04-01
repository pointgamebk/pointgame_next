"use server";

import {
  CreateCommentParams,
  GetCommentsByGameParams,
  GetCommentsByUserParams,
} from "@/types";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";

import Comment from "../database/models/comment.model";
import Game from "../database/models/game.model";
import User from "../database/models/user.model";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// CREATE COMMENT
export const createComment = async (comment: CreateCommentParams) => {
  try {
    await connectToDatabase();

    const game = await Game.findById(comment.gameId);
    if (!game) throw new Error("Game not found");

    const newComment = await Comment.create({
      ...comment,
      game: comment.gameId,
      user: comment.userId,
    });

    game.comments.push(newComment._id);

    await game.save();

    revalidatePath(comment.path);

    return JSON.parse(JSON.stringify(newComment));
  } catch (error) {
    handleError(error);
  }
};

// GET COMMENTS BY GAME
export async function getCommentsByGame({
  searchString,
  gameId,
}: GetCommentsByGameParams) {
  try {
    await connectToDatabase();

    if (!gameId) throw new Error("Game ID is required");
    const gameObjectId = new ObjectId(gameId);

    const comments = await Comment.aggregate([
      {
        $match: {
          game: gameObjectId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          body: 1,
          gameId: "$game",
          user: {
            _id: "$user._id",
            firstName: "$user.firstName",
            lastName: "$user.lastName",
            username: "$user.username",
          },
        },
      },
      {
        $match: {
          body: { $regex: searchString, $options: "i" },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    handleError(error);
  }
}

// GET COMMENTS BY USER
export async function getCommentsByUser({
  userId,
  limit = 3,
  page,
}: GetCommentsByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { player: userId };

    const comments = await Comment.distinct("game._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "game",
        model: Game,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const commentsCount = await Comment.distinct("game._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(comments)),
      totalPages: Math.ceil(commentsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// DELETE COMMENT
export async function deleteComment(commentId: string) {
  try {
    await connectToDatabase();

    const comment = await Comment.findByIdAndDelete(commentId);

    return JSON.parse(JSON.stringify(comment));
  } catch (error) {
    handleError(error);
  }
}
