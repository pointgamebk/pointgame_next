"use client";

import { useTransition } from "react";
import Image from "next/image";
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
import { addPlayerToTeam } from "@/lib/actions/team.actions";
import { addTeam } from "@/lib/actions/user.actions";

export const AddConfirmation = ({
  userId,
  username,
  teamId,
  setUser,
}: {
  userId: string;
  username: string;
  teamId: string;
  setUser: (user: any) => void;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {/* <Image
          src="/assets/icons/arrow.svg"
          alt="edit"
          width={20}
          height={20}
        /> */}
        <div className="text-green">Click to confirm</div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Add this user to the team?</AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-black">
            {username}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await addPlayerToTeam(teamId, userId);
                await addTeam(userId, teamId);
                setUser(null);
              })
            }
          >
            {isPending ? "Adding..." : "Add"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddConfirmation;