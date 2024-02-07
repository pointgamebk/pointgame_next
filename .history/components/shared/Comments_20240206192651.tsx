import { IComment } from "@/lib/database/models/comment.model";
import CommentCard from "./CommentCard";
import Pagination from "./Pagination";
import CommentForm from "./CommentForm";

type CommentsProps = {
  data: IComment[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const Comments = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: CommentsProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 bg-blue pt-5 pb-5">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((comment) => {
              return (
                <li key={comment._id} className="flex justify-center">
                  <CommentCard comment={comment} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col rounded-[14px] bg-blue py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold text-white">{emptyTitle}</h3>
          <p className="p-regular-14 text-white">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Comments;
