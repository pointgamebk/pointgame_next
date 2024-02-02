"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
