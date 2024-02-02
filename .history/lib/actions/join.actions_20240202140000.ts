"use server";

import {
  SubmitJoinParams,
  CreateJoinParams,
  GetJoinsByGameParams,
  GetJoinsByUserParams,
} from "@/types";

import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Join from "../database/models/join.model";
import Game from "../database/models/game.model";
