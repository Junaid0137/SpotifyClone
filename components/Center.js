import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
const colors = [
    "from-indigo-500",
    "from-green-500",
    "from-blue-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];
function Center() {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => console.log("Something went Wrong" + err));
    }, [spotifyApi, playlistId]);

    console.log(playlist);

    return (
        <div className='flex-grow'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center space-x-3 bg-black opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2  text-white sticky top-10' onClick={() => signOut()}>
                    <img src={session?.user.image} alt="" className='h-10 w-10 rounded-full' />
                    <h1>{session?.user.name}</h1>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white p-8 w-full`}>
                <img className='h-14 w-14 shadow-2xl' src={playlist?.images[0]?.url} alt="" className='h-80 w-80' />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
                        {playlist?.name}
                    </h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
