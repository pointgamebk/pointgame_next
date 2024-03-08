"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
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
import { useRouter } from "next/navigation";
import { set } from "mongoose";

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
  const path = usePathname();
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/arrow.svg"
          alt="edit"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Add this user to the team?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {username}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await addPlayerToTeam(teamId, userId);
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
