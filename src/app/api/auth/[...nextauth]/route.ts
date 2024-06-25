import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

console.log(process.env.GITHUB_ID);

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: "cKlcc2cSwECj1nN4MePYVkRTCfs5QYxswGwfBXwhU8g=",
});

export { handler as GET, handler as POST };
