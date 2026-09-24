import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        '/',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/pokellector/id',
        '/api/webhook/clerk',
        '/api/uploadthing'
    ],
    ignoredRoutes: [
        '/pokellector/id',
        '/api/webhook/clerk',
        '/api/uploadthing'
    ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};