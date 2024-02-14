import { IGame } from "@/lib/database/models/game.model";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IGame[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Games_Organized" | "My_Joins" | "All_Games";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 ">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((game) => {
              const hasJoinLink = collectionType === "Games_Organized";
              const hideJoin = collectionType === "My_Joins";
              const gameDate = new Date(game.startDateTime);
              if (gameDate.toISOString() < new Date().toISOString()) {
                return (
                  <li key={game._id} className="flex justify-center">
                    <Card game={game} />
                  </li>
                );
              }
              // const hasJoinLink = collectionType === "Games_Organized";
              // const hideJoin = collectionType === "My_Joins";
              // return (
              //   <li key={game._id} className="flex justify-center">
              //     <Card game={game} hasJoinLink={hasJoinLink} />
              //   </li>
              // );
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
        <div className="flex-center wrapper min-h-[200px] w-full flex-col rounded-[14px] bg-white/30 py-28 text-center text-white">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
