import CommentForm from "@/components/shared/CommentForm";
import Comments from "@/components/shared/Comments";
import JoinButton from "@/components/shared/JoinButton";
import {
  getGameById,
  getRelatedGamesByCategory,
} from "@/lib/actions/game.actions";
import { getJoinsByGame } from "@/lib/actions/join.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const GameDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const game = await getGameById(id);
  const joins = await getJoinsByGame({
    gameId: id,
    searchString: "",
  });

  const relatedGames = await getRelatedGamesByCategory({
    categoryId: game.category._id,
    gameId: game._id,
    page: searchParams.page as string,
  });

  const comments = [
    { id: 1, body: "testing" },
    { id: 2, body: "1,2,3" },
  ];
  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{game.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {game.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {game.organizer.firstName} {game.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          <JoinButton game={game} />

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex-wrap items-center">
                <p>
                  {formatDateTime(game.startDateTime).dateOnly} -{" "}
                  {formatDateTime(game.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(game.endDateTime).dateOnly} -{" "}
                  {formatDateTime(game.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{game.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What To Expect:</p>
            <p className="p-medium-16 lg:p-regular-18">{game.description}</p>
          </div>
        </div>
      </section>

      <section>
        {/* <Comments
          data={comments}
          emptyTitle="No comments yet"
          emptyStateSubtext="Check again later"
          limit={6}
          page={searchParams.page as string}
          totalPages={1}
        /> */}
        <CommentForm gameId={game.id} />
      </section>
    </>
  );
};

export default GameDetails;
