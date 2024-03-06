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

import { leagueDefaultValues } from "@/constants";

import { useRouter } from "next/navigation";

import { createLeague } from "@/lib/actions/league.action";
import { ITeam } from "@/lib/database/models/team.model";
import { teamFormSchema } from "@/lib/validator";
