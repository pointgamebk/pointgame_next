import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllGames } from "@/lib/actions/game.actions";

import Collection from "@/components/shared/Collection";

export default async function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Post, Connect, Play: Your Games, One Platform
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Post and join with over 10,000+ recreational sports players across
              America using point.game.
            </p>
            <Button size="lg" asChild className="button w-full">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          For the <br /> true ballers
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search CategoryFilter
          {/* <Search />
          <CategoryFilter /> */}
        </div>

        {/* <Collection
          data={games?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Check again later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        /> */}
      </section>
    </>
  );
}
