"use client";

import { useState } from "react";
import PlayerForm from "./PlayerForm";
import { AddConfirmation } from "./AddConfirmation";

interface User {
  _id: string;
  username: string;
}

type UserSearchBoxProps = {
  teamId: string;
  leagueId: string;
};

const UserSearchBox = ({ teamId, leagueId }: UserSearchBoxProps) => {
  const [user, setUser] = useState<User>() || null;
  return (
    <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left text-white">
        Add Player
      </h3>

      <div className="wrapper my-8">
        <PlayerForm teamId={teamId} setUser={setUser} />
      </div>

      {user && (
        <div>
          <h3 className="text-white h3-bold">{user.username}</h3>
          <AddConfirmation
            userId={user._id}
            username={user.username}
            teamId={teamId}
            setUser={setUser}
            path={`/teams/${teamId}`}
          />
        </div>
      )}
    </section>
  );
};

export default UserSearchBox;
