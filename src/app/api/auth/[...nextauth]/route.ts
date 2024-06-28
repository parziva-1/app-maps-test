import {
  getDatabaseUserByEmail,
  registerNewUser,
  updateLocationsForUser,
  updateUserId,
} from "@/lib/db/database";
import { IUser } from "@/models/user";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const userId = cookies().get("user_id")?.value;
      const userType = cookies().get("user_type")?.value;

      let dbUser = await getDatabaseUserByEmail(user.email as string);

      if (!dbUser) {
        dbUser = await registerNewUser(user as IUser);
        if (userId && userType === "guest") {
          dbUser = await updateUserId(userId, dbUser._id);
        }
      }

      if (userId && userId !== dbUser._id) {
        updateLocationsForUser(userId, dbUser._id);
      }

      cookies().set("user_id", dbUser._id);
      cookies().set("user_type", String(dbUser.type));
      if (dbUser) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
