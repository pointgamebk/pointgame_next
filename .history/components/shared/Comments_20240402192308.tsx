import { IComment } from "@/lib/database/models/comment.model";
import CommentCard from "./CommentCard";

type CommentsProps = {
  data: IComment[];
  gameId: string;
  emptyTitle: string;
  emptyStateSubtext: string;
};

const Comments = ({ data, emptyTitle, emptyStateSubtext }: CommentsProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-row items-center gap-10 bg-blue pt-5 pb-5 px-5">
          <ul className="w-full items-center">
            {data.map((comment) => {
              return (
                <li key={comment._id} className="flex items-center mb-5">
                  <CommentCard comment={comment} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold text-white">{emptyTitle}</h3>
          <p className="p-regular-14 text-white">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Comments;
