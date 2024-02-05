import { IComment } from "@/lib/database/models/comment.model";
import CommentCard from "./CommentCard";
import Pagination from "./Pagination";

type CommentsProps = {
  data: IComment[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
};

const Comments = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
}: CommentsProps) => {};
