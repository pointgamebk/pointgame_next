import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SearchParamProps } from "@/types";
import { getAllGames } from "@/lib/actions/game.actions";

import Collection from "@/components/shared/Collection";
import CategoryFilter from "@/components/shared/CategoryFilter";
import GetLocation from "@/components/shared/GetLocation";
import AddressSearch from "@/components/shared/AddressSearch";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const games = await getAllGames({
    query: searchText,
    category,
    page,
    limit: 6,
  });
  return (
    <>
      <section className="wrapper">
        <GetLocation />
      </section>

      <section className="bg-blue bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 bg-blue">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-white">
              Share. Connect. Play. <br /> Your Games, One Platform.
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-white">
              Post and join with over 10,000+ recreational sports players across
              America using point.game.
            </p>
            <Button size="lg" asChild className="button w-full">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero3.jpg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper bg-blue my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold text-white">
          For the <br /> true ballers
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row ">
          <AddressSearch />
          <CategoryFilter />
        </div>

        <Collection
          data={games?.data}
          emptyTitle="No Games Found"
          emptyStateSubtext="Check again later"
          collectionType="All_Games"
          limit={6}
          page={page}
          totalPages={games?.totalPages}
        />
      </section>
    </>
  );
}
