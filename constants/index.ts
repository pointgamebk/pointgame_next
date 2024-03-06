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

export const leagueDefaultValues = {
  name: "",
  description: "",
  categoryId: "",
  administrator: "",
};

export const teamDefaultValues = {
  name: "",
  leagueId: "",
};

export const commentDefaultValues = {
  body: "",
};
