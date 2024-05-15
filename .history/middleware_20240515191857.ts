import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/how_to",
    "/leagues",
    "/leagues/:id",
    "/games/:id",
    "/policy/legal",
    "/api/webhook/clerk",
    "/api/uploadthing",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
