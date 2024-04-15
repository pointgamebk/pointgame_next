const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 md:pr-40">
            <h2 className="h2-bold text-white">Point.Game How To</h2>
            <p className="p-regular-20 md:p-regular-24 text-white underline">
              PointGame Instructions and General Rules
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-20">
                Users must register an account with PointGame in order to do the
                following:
              </li>
              <li className="ml-8">Create a recreational game</li>
              <li className="ml-8">Join a recreational game</li>
              <li className="ml-8">
                Leave a comment related to a specific game
              </li>
              <li className="ml-8">
                Leave a comment related to a specific game
              </li>
              <li className="ml-8">Join a recreational league</li>
            </ul>

            <p className="p-regular-20 md:p-regular-24 text-white underline">
              Recreational Game Instructions/General Rules
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                Registered users can create a game by following these steps:
              </li>
              <ul className="ml-8">
                <li>
                  Navigating to the user profile page by clicking “My Profile”
                  on the application header. On mobile devices, the “My Profile”
                  link can be accessed through the icon in the far right corner
                  of the header.
                </li>
                <li>Click the “Create New Game” button</li>
                <li>Enter the following details:</li>
                <li className="ml-10">Game title</li>
                <li className="ml-10">The sport being played</li>
                <li className="ml-10">
                  A short description or important game details
                </li>
                <li className="ml-10">The game's location</li>
                <li className="ml-10">
                  The game's expected start date and time
                </li>
                <li className="ml-10">The game's expected end date and time</li>
                <li>Click the “Create Game” button to complete the process</li>
              </ul>
            </ul>

            <ul className="list-disc ml-4 text-white p-regular-18">
              <li>
                Games are displayed on the homepage, ordered based on start date
                ascending.
              </li>
              <li>
                Clicking on a game card displayed on the homepage will take you
                to a page further detailing the selected game, along with a
                visual map of the game's location.
              </li>
              <li>
                From this page, users who have not created the game can either
                join, or “unjoin” the game if they have already joined it.
              </li>
              <li>
                Users can also leave questions or comments related to the game.
              </li>
              <li>
                Users can edit the details or delete a game they've created by
                clicking the related icons in the upper-right hand of the game
                card, and following the prompt where applicable.
              </li>
              <li>
                Games can be filtered by location using the “Search game
                address…” input field located on the homepage.
              </li>
              <li>
                Games can also be filtered by sport, using the “Filter games by
                sport” dropdown menu also located on the homepage.
              </li>
            </ul>

            <p className="p-regular-20 md:p-regular-24 text-white underline">
              Recreational League Instructions/General Rules
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                PointGame allows users to start or join recreational leagues
                created on the platform.
              </li>
              <li className="p-regular-18">
                To access this feature, user can click on the “Leagues” link in
                the application header, or the link can be accessed through the
                icon in the far right corner of the header on mobile devices.
              </li>
              <li className="p-regular-18">
                Here, users will see a list of all the recreational leagues
                created on the platform.
              </li>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
              <ul className="ml-8">
                <li>League name</li>
                <li>League sport</li>
                <li>The league's description and important details</li>
                <li>
                  Click the “Create League” button to complete the process
                </li>
                <li>
                  The league creator will automatically be listed as the
                  league's administrator
                </li>
              </ul>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
              <li className="p-regular-18">
                To create a league, simply click the “Create League” button and
                enter the following details:
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
