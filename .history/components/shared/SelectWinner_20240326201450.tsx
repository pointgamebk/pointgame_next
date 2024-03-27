"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { selectMatchWinner } from "@/lib/actions/match.actions";
import { IMatch } from "@/lib/database/models/match.model.";

import WinnerDropdown from "./WinnerDropdown";

export const SelectWinner = ({
  match,
  matchId,
  path,
}: {
  matchId: string;
  match: IMatch;
  path: string;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>Select Winner</AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Select the winner of this match</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will set the winner of this match. This action is reversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <WinnerDropdown match={match} />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              //   startTransition(async () => {
              //     await deleteSchedule(scheduleId, path);
              //   })
              startTransition(async () => {
                await selectMatchWinner(matchId, path);
              })
            }
          >
            {isPending ? "Submitting..." : "Submit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
