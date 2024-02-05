"use server";

import {
  CreateCommentParams,
  GetCommentsByGameParams,
  GetCommentsByUserParams,
} from "@/types";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";

import Comment from "../database/models/comment.model";
