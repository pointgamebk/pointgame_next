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

export const UnsetWinner = ({
  matchId,
  path,
}: {
  matchId: string;
  path: string;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>{name}</AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Select the winner of this match</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {`This will set ${name} as the winner of this match.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await selectMatchWinner(matchId, teamId, path);
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
