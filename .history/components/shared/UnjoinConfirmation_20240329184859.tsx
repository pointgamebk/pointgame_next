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

import { removeJoin } from "@/lib/actions/game.actions";

export const UnjoinConfirmation = ({
  gameId,
  userId,
  path,
}: {
  gameId: string;
  userId: string;
  path: string;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      {/* <AlertDialogTrigger className="text-green">Unjoin</AlertDialogTrigger> */}
      <AlertDialogTrigger className="text-green">
        <div className="flex gap-3">
          <p className="p-medium-16 rounded-full bg-white/30 px-4 py-2.5 text-white">
            Unjoin
          </p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Unjoin this game?</AlertDialogTitle>
          {/* <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this player from the team and all their
            team data. This action is irreversible.
          </AlertDialogDescription> */}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await removeJoin({ gameId, userId, path });
              })
            }
          >
            {isPending ? "Unjoining..." : "Unjoin"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
