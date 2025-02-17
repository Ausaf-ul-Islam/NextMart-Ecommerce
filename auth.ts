import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, GitHub, Facebook,],
});