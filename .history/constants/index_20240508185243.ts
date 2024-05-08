export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Game",
    route: "/games/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const gameDefaultValues = {
  title: "",
  description: "",
  location: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
};

export const matchDefaultValues = {
  startDateTime: new Date(),
  teamOneId: "",
  teamTwoId: "",
};

export const leagueDefaultValues = {
  name: "",
  description: "",
  categoryId: "",
  administrator: "",
  locale: "",
  email: "",
};

export const teamDefaultValues = {
  name: "",
  leagueId: "",
};

export const playerDefaultValues = {
  username: "",
};

export const commentDefaultValues = {
  body: "",
};

const testUserTds = [
  "66087c7cc30e486c688da475",
  "660886ceb8db48e3e294acc3",
  "6615ae26a08c4d7a9b0fbf10",
  "6637f322a11a08ef9baffdb6",
  "663a9c33ce356f23fe3b8fc2",
  "",
];
