import { SearchParamProps } from "@/types";
import { getTeamById } from "@/lib/actions/team.actions";
import { auth } from "@clerk/nextjs";
import UserSearch from "@/components/shared/UserSearch";

const TeamDetails = async ({ params: { id } }: SearchParamProps) => {
  const team = await getTeamById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">{team.name}</h2>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <UserSearch teamId={id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamDetails;
