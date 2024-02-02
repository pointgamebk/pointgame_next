"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./Dropdown";

import { gameDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { createGame, updateGame } from "@/lib/actions/game.actions";
import { IGame } from "@/lib/database/models/game.model";
import { gameFormSchema } from "@/lib/validator";

type GameFormProps = {
  userId: string;
  type: "Create" | "Update";
  game?: IGame;
  gameId?: string;
};

const GameForm = ({ userId, type, game, gameId }: GameFormProps) => {
  const initialValues =
    game && type === "Update"
      ? {
          ...game,
          startDateTime: new Date(game.startDateTime),
          endDateTime: new Date(game.endDateTime),
        }
      : gameDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof gameFormSchema>>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof gameFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      ></form>
    </Form>
  );
};

export default GameForm;
