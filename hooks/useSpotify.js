import spotifyApi from '@/lib/spotify';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react'
// import SpotifyWebApi from 'spotify-web-api-node';

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.NEXTPUBLIC_SPOTIFY_CLIENT_SECRET,
// });

function useSpotify() {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}

export default useSpotify
