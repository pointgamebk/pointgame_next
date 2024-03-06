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
import { teamFormSchema } from "@/lib/validator";

type TeamFormProps = {
  leagueId: string;
};

const TeamForm = ({ leagueId }: TeamFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: teamDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof teamFormSchema>) {
    const teamData = values;
    console.log(teamData);

    try {
      const newTeam = await createTeam({
        team: teamData,
        leagueId,
      });
      console.log(newTeam);
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Team name"
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
          {form.formState.isSubmitting ? "Submitting..." : "Add Team"}
        </Button>
      </form>
    </Form>
  );
};

export default TeamForm;
