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

// CREATE COMMENT
export const createComment = async (comment: CreateCommentParams) => {
  try {
    await connectToDatabase();

    const newComment = await Comment.create({
      ...comment,
      game: comment.gameId,
      user: comment.userId,
    });

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

    if (!userId) throw new Error("User ID is required");
    const userObjectId = new ObjectId(userId);

    const comments = await Comment.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $lookup: {
          from: "games",
          localField: "game",
          foreignField: "_id",
          as: "game",
        },
      },
      {
        $unwind: "$game",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          body: 1,
          gameId: "$game._id",
          gameTitle: "$game.title",
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
```
