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
import { matchDefaultValues } from "@/constants";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { IMatch } from "@/lib/database/models/match.model.";
import { matchFormSchema } from "@/lib/validator";
import { createMatch } from "@/lib/actions/match.actions";

import MatchDropdown from "./MatchDropdown";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MatchFormProps = {
  scheduleId: string;
  leagueId: string;
};

const MatchForm = ({ scheduleId, leagueId }: MatchFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof matchFormSchema>>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: matchDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof matchFormSchema>) {
    const matchData = values;

    try {
      const newMatch = await createMatch({
        match: matchData,
        scheduleId,
        //path: "/schedule",
      });
      if (newMatch) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
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
            name="teamOne"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <MatchDropdown
                    leagueId={leagueId}
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="teamTwo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <MatchDropdown
                    leagueId={leagueId}
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      minDate={new Date()}
                    />
                  </div>
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
          {form.formState.isSubmitting ? "Submitting..." : "Create Match"}
        </Button>
      </form>
    </Form>
  );
};

export default MatchForm;
