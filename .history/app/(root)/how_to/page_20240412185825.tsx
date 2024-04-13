const HowTo = async () => {
  return (
    <>
      <section className="flex justify-center bg-blue bg-dotted-pattern bg-contain">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold text-white">Point.Game How To</h2>
            <p className="p-regular-20 md:p-regular-24 text-white">
              PointGame Instructions and General Rules
            </p>
            <p className="p-regular-16 md:p-regular-24 text-white">
              Users must register an account with PointGame in order to do the
              following:
            </p>
            <ul className="list-disc ml-4 text-white">
              <li>
                <span className="inline-block w-1 h-1 mr-2 rounded-full bg-white text-center"></span>
                Create a recreational game
              </li>
              <li>Join a recreational game</li>
              <li>Leave a comment related to a specific game</li>
              <li>Leave a comment related to a specific game</li>
              <li>Join a recreational league</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
