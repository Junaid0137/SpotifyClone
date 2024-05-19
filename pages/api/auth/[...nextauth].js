import spotifyApi from "@/lib/spotify";
import { LOGIN_URL } from "@/lib/spotify";
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshAccessToken } = await spotifyApi.refreshAccessToken();
        console.log("refreshAccessToken", refreshAccessToken);

        return {
            ...token,
            accessToken: refreshAccessToken.access_token,
            accessTokenExpires: Date.now() + refreshAccessToken.expires_in * 1000,
            refreshToken: refreshAccessToken.refresh_token || token.refreshToken,
        }

    } catch (error) {
        console.error("Error refreshing access token", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_ID,
            clientSecret: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_SECRET,
            authorizationUrl: LOGIN_URL,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, account, user }) {

            //initial Singin
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                }
            }


            // Return previous token if the access token has not expired
            if (Date.now() < token.accessTokenExpires) {
                console.log("Existing Access token is valid");
                return token;
            }

            // Access token has expired, so we need to refresh it
            console.log("Access token has expired, refreshing token");
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;
            return session;
        }
    }
}

export default NextAuth(authOptions);