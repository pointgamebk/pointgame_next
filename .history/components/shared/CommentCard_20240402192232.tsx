import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
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
      <div className="flex-between w-full py-3">
        <p className="font-semibold pl-5 md:p-medium-16 text-black">
          {comment.user.username}
        </p>
        <p className="pr-3 md:p-medium-16 text-grey-600">
          {formatDateTime(comment.createdAt).dateOnly}{" "}
          {formatDateTime(comment.createdAt).timeOnly}{" "}
        </p>
        {isCommentCreator && (
          <div className="pr-5">
            <DeleteCommentConfirmation commentId={comment._id} />
          </div>
        )}
      </div>

      <div className="px-2">
        <Separator className="border border-grey-500" />
      </div>

      <div className="flex-between w-full">
        <p className="p-5 md:p-medium-16 text-grey-600">{comment.body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
