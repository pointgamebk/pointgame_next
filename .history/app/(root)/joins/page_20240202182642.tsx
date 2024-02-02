import Search from "@/components/shared/Search";
import { getJoinsByGame } from "@/lib/actions/join.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IJoinItem } from "@/lib/database/models/join.model";

const Joins = async ({ searchParams }: SearchParamProps) => {
  const gameId = (searchParams?.gameId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const joins = await getJoinsByGame({ gameId, searchString: searchText });
};
