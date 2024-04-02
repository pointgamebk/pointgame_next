import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { DeleteCommentConfirmation } from "./DeleteCommentConfirmation";

type CommentCardProps = {
  comment: IComment;
  gameId: string;
};

const CommentCard = ({ comment, gameId }: CommentCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isCommentCreator = userId === comment.user._id.toString();

  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      {/* {isCommentCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <DeleteCommentConfirmation commentId={comment._id} gameId={gameId} />
        </div>
      )} */}
      <div className="flex-between w-full py-3">
        <p className="font-semibold pl-5 md:p-medium-16 text-black">
          {comment.user.username}
        </p>
        <p className="pr-3 md:p-medium-16 text-grey-600">
          {formatDateTime(comment.createdAt).dateOnly}{" "}
          {formatDateTime(comment.createdAt).timeOnly}{" "}
        </p>
      </div>

      <div className="px-2">
        <Separator className="border border-grey-500" />
      </div>

      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">{comment.body}</p>
      </div>
      <div className="">
        <DeleteCommentConfirmation commentId={comment._id} gameId={gameId} />
      </div>
    </div>
  );
};

export default CommentCard;
