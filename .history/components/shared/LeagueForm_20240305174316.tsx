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
import Dropdown from "./Dropdown";

import { leagueDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { createLeague } from "@/lib/actions/league.action";
import { ILeague } from "@/lib/database/models/league.model";
import { leagueFormSchema } from "@/lib/validator";

type LeagueFormProps = {
  userId: string;
  league?: ILeague;
};
