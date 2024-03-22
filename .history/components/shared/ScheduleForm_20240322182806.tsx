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
import { scheduleFormSchema } from "@/lib/validator";
import { createSchedule } from "@/lib/actions/schedule.actions";

type ScheduleFormProps = {
  leagueId: string;
};

const ScheduleForm = ({ leagueId }: ScheduleFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: teamDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
    const scheduleData = values;

    try {
      const newSchedule = await createSchedule({
        schedule: scheduleData,
        leagueId,
      });

      form.reset();
      //router.push(`/teams/${newTeam._id}`);
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
                    placeholder="Schedule name"
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
          {form.formState.isSubmitting ? "Submitting..." : "Add Schedule"}
        </Button>
      </form>
    </Form>
  );
};

export default ScheduleForm;
