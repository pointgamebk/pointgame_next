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

import {  }
import { commentFormSchema } from "@/lib/validator";

type GameFormProps = {
  userId: string;
  gameId?: string;
};

const GameForm = ({ userId, gameId }: GameFormProps) => {};
