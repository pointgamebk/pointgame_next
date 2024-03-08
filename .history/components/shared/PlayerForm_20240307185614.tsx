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
import { playerDefaultValues } from "@/constants";

import { useRouter } from "next/navigation";

import { getUserByUserName } from "@/lib/actions/user.actions";
import { addPlayerToTeam } from "@/lib/actions/team.actions";

import { playerFormSchema } from "@/lib/validator";
import { set } from "mongoose";

type PlayerFormProps = {
  teamId: string;
  setUser: (user: any) => void;
};

const PlayerForm = ({ teamId, setUser }: PlayerFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof playerFormSchema>>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: playerDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof playerFormSchema>) {
    try {
      const user = await getUserByUserName(values.username);
      if (!user) throw new Error("User not found");

      setUser(user);
      values.username = "";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Searching..." : "Search User"}
        </Button>
      </form>
    </Form>
  );
};

export default PlayerForm;
