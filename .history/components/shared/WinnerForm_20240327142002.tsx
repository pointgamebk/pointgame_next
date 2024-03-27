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
import { matchFormSchema } from "@/lib/validator";
import { winnerFormSchema } from "@/lib/validator";

import { createMatch } from "@/lib/actions/match.actions";
import { selectMatchWinner } from "@/lib/actions/match.actions";

import MatchDropdown from "./MatchDropdown";
import WinnerDropdown from "./WinnerDropdown";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type WinnerFormProps = {
  matchId: string;
  winner: string;
};

const WinnerForm: React.FC<WinnerFormProps> = ({ matchId, winner }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof winnerFormSchema>>({
    resolver: zodResolver(winnerFormSchema),
    defaultValues: winnerFormSchema,
  });

  async function onSubmit(values: z.infer<typeof winnerFormSchema>) {
    const matchData = values;

    // try {
    //   const newMatch = await createMatch({
    //     match: matchData,
    //     scheduleId,
    //     path: `/schedules/${scheduleId}`,
    //   });

    //   if (newMatch) {
    //     form.reset();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
            name="winner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <WinnerDropdown match={matchId} winner={winner} />
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

export default WinnerForm;
