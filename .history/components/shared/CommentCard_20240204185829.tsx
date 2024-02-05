import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CommentCardProps = {
  comment: IComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isCommentCreator = userId === comment.user._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"></div>
  );
};
