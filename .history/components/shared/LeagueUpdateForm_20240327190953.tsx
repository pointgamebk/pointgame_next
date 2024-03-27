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

import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import {
  updateLeagueDescription,
  getLeagueById,
} from "@/lib/actions/league.action";

import { updateLeagueDescriptionFormSchema } from "@/lib/validator";

type LeagueUpdateFormProps = {
  leagueId: string;
};

const LeagueUpdateForm = async ({ leagueId }: LeagueUpdateFormProps) => {
  const league = await getLeagueById(leagueId);

  const router = useRouter();

  const form = useForm<z.infer<typeof updateLeagueDescriptionFormSchema>>({
    resolver: zodResolver(updateLeagueDescriptionFormSchema),
    defaultValues: league.description,
  });

  async function onSubmit(
    values: z.infer<typeof updateLeagueDescriptionFormSchema>
  ) {
    try {
      await updateLeagueDescription(leagueId, values.description);
      router.push(`/leagues/${leagueId}`);
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    className="textarea rounded-2xl"
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit Update"}
        </Button>
      </form>
    </Form>
  );
};
