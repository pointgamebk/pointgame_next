// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== GAME PARAMS
export type CreateGameParams = {
  userId: string;
  game: {
    title: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
  };
  path: string;
};

export type UpdateGameParams = {
  userId: string;
  game: {
    _id: string;
    title: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
  };
  path: string;
};

export type DeleteGameParams = {
  gameId: string;
  path: string;
};

export type GetAllGamesParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetGamesByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedGamesByCategoryParams = {
  categoryId: string;
  gameId: string;
  limit?: number;
  page: number | string;
};

export type Game = {
  _id: string;
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  startDateTime: Date;
  endDateTime: Date;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== LEAGUE PARAMS
export type CreateLeagueParams = {
  userId: string;
  league: {
    name: string;
    description: string;
    category: string;
  };
};

export type League = {
  _id: string;
  name: string;
  description: string;
  adminisreator: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== TEAM PARAMS
export type CreateTeamParams = {
  team: {
    name: string;
    leagueId: string;
  };
};

export type Team = {
  _id: string;
  name: string;
  league: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== JOIN PARAMS
export type SubmitJoinParams = {
  gameTitle: string;
  gameId: string;
  playerId: string;
};

export type CreateJoinParams = {
  gameId: string;
  playerId: string;
  createdAt: Date;
};

export type GetJoinsByGameParams = {
  gameId: string;
  searchString: string;
};

export type GetJoinsByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== COMMENT PARAMS
export type CreateCommentParams = {
  gameId: string;
  userId: string;
  body: string;
};

export type GetCommentsByGameParams = {
  gameId: string;
  searchString: string;
};

export type GetCommentsByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};
