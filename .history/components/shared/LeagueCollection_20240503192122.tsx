import { ILeague } from "@/lib/database/models/league.model";
import LeagueCard from "./LeagueCard";
import Pagination from "./Pagination";

type LeagueCollectionProps = {
  data: ILeague[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const LeagueCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: LeagueCollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 ">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((league) => {
              return (
                <li key={league._id} className="flex justify-center">
                  <LeagueCard league={league} />
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
        <div className="flex-center wrapper min-h-[200px] w-full flex-col rounded-[14px] bg-white/30 py-28 text-center text-white">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default LeagueCollection;
