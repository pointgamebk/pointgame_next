"use client";

import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";

type CommentLocaleConverterProps = {
  comment: IComment;
};

const CommentLocaleConverter = ({ comment }: CommentLocaleConverterProps) => {
  return (
    <p className="pr-3 p-medium-12 text-grey-600">
      {formatDateTime(comment.createdAt).dateOnly}{" "}
      {formatDateTime(comment.createdAt).timeOnly}{" "}
    </p>
  );
};

export default CommentLocaleConverter;
