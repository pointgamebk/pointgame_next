"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import User from "../database/models/user.model";
import { handleError } from "@/lib/utils";

import { CreateLeagueParams } from "@/types";
