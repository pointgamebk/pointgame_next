const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">Point.Game How To</h2>
            <p className="p-regular-20 md:p-regular-24 text-white underline">
              PointGame Instructions and General Rules
            </p>
            <p className="p-regular-16 md:p-regular-24 text-white">
              Users must register an account with PointGame in order to do the
              following:
            </p>
            <ul className="list-disc  ml-4  text-white">
              <li>&#x2022; Create a recreational game</li>
              <li>&#x2022; Join a recreational game</li>
              <li>&#x2022; Leave a comment related to a specific game</li>
              <li>&#x2022; Leave a comment related to a specific game</li>
              <li>&#x2022; Join a recreational league</li>
            </ul>

            <p className="p-regular-20 md:p-regular-24 text-white underline">
              Recreational Game Instructions/General Rules
            </p>
            <p className="p-regular-16 md:p-regular-20 text-white">
              &#x2022; Registered users can create a game by following these
              steps:
            </p>
            <ul className="list-disc  ml-4  text-white">
              <li>
                &#x2022; Navigating to the user profile page by clicking “My
                Profile” on the application header. On mobile devices, the “My
                Profile” link can be accessed through the icon in the far right
                corner of the header.
              </li>
              <li>&#x2022; Click the “Create New Game” button</li>
              <li>&#x2022; Enter the following details:</li>
              <li className="ml-10">&#9642; Game title</li>
              <li className="ml-10">&#9642; The sport being played</li>
              <li className="ml-10">
                &#9642; A short description or important game details
              </li>
              <li className="ml-10">&#9642; The game's location</li>
              <li className="ml-10">
                &#9642; The game's expected start date and time
              </li>
              <li className="ml-10">
                &#9642; The game's expected end date and time
              </li>
              <li>
                &#x2022; Click the “Create Game” button to complete the process
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
