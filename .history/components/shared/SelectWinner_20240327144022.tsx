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
import { ITeam, IWinner } from "@/lib/database/models/team.model";

export const SelectWinner = ({
  matchId,
  winner,
}: {
  matchId: string;
  winner: IWinner;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>{winner.name}</AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Select the winner of this match</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {`This will set ${winner.name} as the winner of this match. This action is reversible.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
          // onClick={() =>
          //   startTransition(async () => {
          //     await selectMatchWinner(matchId, path);
          //   })
          // }
          >
            {isPending ? "Submitting..." : "Submit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
