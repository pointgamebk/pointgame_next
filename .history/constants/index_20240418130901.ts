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
