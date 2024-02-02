"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Game from "../database/models/game.model";
import Category from "../database/models/category.model";
