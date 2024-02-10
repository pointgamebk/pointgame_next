import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Separator } from "../ui/separator";

type CommentCardProps = {
  comment: IComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isCommentCreator = userId === comment.user._id.toString();

  return (
    // <div className="group relative flex min-h-[100px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[300px] sm:max-w-[150px]">
    //   <div className="flex-between w-full">
    //     <p className="p-5 md:p-medium-16 text-grey-600">
    //       {comment.user.username}
    //     </p>
    //   </div>
    //   <div className="flex-between w-full">
    //     <p className="p-5 md:p-medium-16 text-grey-600">{comment.body}</p>
    //   </div>
    // </div>
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">
          {comment.user.username}
        </p>
        <p className="p-5 md:p-medium-16 text-grey-600">
          {formatDateTime(comment.createdAt).dateOnly}-{" "}
          {formatDateTime(comment.createdAt).timeOnly}{" "}
        </p>
      </div>
      <Separator className="border border-black" />
      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
