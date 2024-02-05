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
