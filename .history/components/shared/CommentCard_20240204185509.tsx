import { IComment } from "@/lib/database/models/comment.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CommentCardProps = {
  game: IComment;
  hasJoinLink?: boolean;
};
