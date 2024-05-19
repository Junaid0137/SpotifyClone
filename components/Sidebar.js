import React, { useEffect, useState } from 'react'
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassCircleIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '@/hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '@/atoms/playlistAtom';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    // console.log("You clicked " + playlistId);
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);
    return (
        <div id='div1'>
            <div id='div2'>
                <button>
                    <HomeIcon height={30} width={30} />
                    <p>Home</p>
                </button>
                <button>
                    <MagnifyingGlassCircleIcon height={30} width={30} />
                    <p>Search</p>
                </button>
                <button>
                    <BuildingLibraryIcon height={30} width={30} />
                    <p>Library</p>
                </button>
                <hr />
                <button>
                    <PlusCircleIcon height={30} width={30} />
                    <p>Create Playlist</p>
                </button>
                <button>
                    <HeartIcon height={30} width={30} />
                    <p>Liked Songs</p>
                </button>
                <button>
                    <RssIcon height={30} width={30} />
                    <p>Your Episode</p>
                </button>
                <hr />
                {playlists.map((playlists) => (
                    <p key={playlists.id} onClick={() => setPlaylistId(playlists.id)} id='cursor-pointer'>{playlists.name}</p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
