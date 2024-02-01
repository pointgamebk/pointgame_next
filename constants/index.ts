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

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
};
