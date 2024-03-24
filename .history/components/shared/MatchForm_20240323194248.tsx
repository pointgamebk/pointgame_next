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
import Dropdown from "./Dropdown";

import { matchDefaultValues } from "@/constants";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { IMatch } from "@/lib/database/models/match";
import { matchFormSchema } from "@/lib/validator";
import { createMatch } from "@/lib/actions/match.actions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MatchFormProps = {
  scheduleId: string;
};

const MatchForm = ({ scheduleId }: MatchFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof matchFormSchema>>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: matchDefaultValues,
  });
};
