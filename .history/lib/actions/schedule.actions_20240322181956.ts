"use server";

import { connectToDatabase } from "@/lib/database";
import League from "../database/models/league.model";
import { handleError } from "@/lib/utils";
import { ISchedule } from "../database/models/schedule";
import { CreateScheduleParams } from "@/types";

// CREATE
