const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6 md:pr-40">
            <h2 className="h2-bold text-white">How To point.game</h2>
            <ul className="list-disc ml-4 text-white">
              <li className="p-semibold-18">
                Users must register an account with PointGame in order to do the
                following:
              </li>
              <li className="ml-8">Create a recreational game</li>
              <li className="ml-8">Join a recreational game</li>
              <li className="ml-8">
                Leave a comment related to a specific game
              </li>
              <li className="ml-8">Create or join a recreational league</li>
            </ul>

            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Recreational Game Instructions & General Rules
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
                Games can be filtered by location using the “Search by
                location…” input field located on the homepage.
              </li>
              <li>
                Games can also be filtered by sport, using the “Filter games by
                sport” dropdown menu also located on the homepage.
              </li>
            </ul>

            <p className="p-bold-20 md:p-bold-24 text-green underline">
              Recreational League Instructions/General Rules
            </p>

            <ul className="list-disc ml-4 text-white">
              <li className="p-regular-18">
                PointGame allows users to start or join recreational leagues
                created on the platform.
              </li>
              <li className="p-regular-18">
                To access this feature, users can click on the “Leagues” link in
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
                <li>League location (general)</li>
                <li>League contact email</li>
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
                League activities and details such as rosters and schedules can
                be accessed by clicking on a specific league name on the Leagues
                page.
              </li>
              <li className="p-regular-18">
                From this page, league administrators can add teams to the
                league, and create a schedule.
              </li>
              <li className="p-regular-18">
                Once a team has been created, it will be listed in the Teams
                table.
              </li>
              <li className="p-regular-18">Adding users to a team:</li>
              <ul className="ml-8">
                <li>
                  To add users to a specific team, administrators must be on
                  that specific teams page.
                </li>
                <li>
                  There, admins will see an “Add Player” form on the bottom of
                  the page.
                </li>
                <li>
                  Admins must enter the user's PointGame username, and press the
                  “Search User” button.
                </li>
                <li>
                  If the username is found, it will appear underneath the form
                  along with a “Click to confirm” button.
                </li>
                <li>
                  Click this button and follow the prompt to add the user as a
                  team member.
                </li>
              </ul>
              <li className="p-regular-18">Creating a schedule:</li>
              <ul className="ml-8">
                <li>
                  League admins can also create a schedule from the league
                  details page, using the related form on the bottom of the
                  page.
                </li>
                <li>Give the schedule a name, and click “Add Schedule”.</li>
                <li>
                  The schedule will then be listed in the Schedules table of the
                  league details page, and a page for that specific schedule
                  will also be created.
                </li>
              </ul>
              <li className="p-regular-18">Creating a match:</li>
              <ul className="ml-8">
                <li>A schedule consists of “matches”.</li>
                <li>
                  To create scheduled matches, league admins can do so from the
                  specified schedule page.
                </li>
                <li>
                  There the admin can select Team 1 and Team 2 from the team
                  list dropdown menus, the match date and time, and clicking
                  Create Match will add it to the schedule.
                </li>
                <li>
                  After the match is completed, the admin can list the winner by
                  clicking the winning teams name in the table, and confirming
                  the prompt.
                </li>
                <li>
                  To reset the match, the admin can click the on the team in the
                  winner column, and follow the prompt.
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
