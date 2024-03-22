"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { teamDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import { createTeam } from "@/lib/actions/team.actions";
import { scheduleFormSchema } from "@/lib/validator";

type ScheduleFormProps = {
  leagueId: string;
};
