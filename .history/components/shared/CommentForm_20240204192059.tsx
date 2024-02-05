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

import { createComment } from "@/lib/actions/comment.actions";
import { IComment } from "@/lib/database/models/comment.model";

import { commentDefaultValues } from "@/constants";
import { commentFormSchema } from "@/lib/validator";
import { comment } from "postcss";

type GameFormProps = {
  userId: string;
  gameId?: string;
};

const GameForm = ({ userId, gameId }: GameFormProps) => {
  const initialValues = commentDefaultValues;

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    const commentData = values;

    console.log(commentData);
  }
};
