import { currentTrackState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify'
import { time } from '@/lib/time';
import React from 'react'
import { useRecoilState } from 'recoil';

function Song({ order, track }) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
    const [isplaying, setIsPlaying] = useRecoilState(isPlayingState);
    const playSong = async () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        }).then(() => {
            console.log(err);
        });
    }
    return (
        <div className='grid grid-cols-2 p-5 hover:bg-gray-900 cursor-pointer opacity-100' onClick={playSong}>
            <div className='flex items-center space-x-5'>
                <p className='pl-5'>{order + 1}</p>
                <img className='h-10 w-10' src={track.track.album?.images[0]?.url} alt='' />
                <div className='w-36 lg:w-64 text-white truncate'>
                    <p>{track.track.name}</p>
                    <p className='opacity-60'>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0 opacity-60'>
                <p className='hidden md:inline-flex'>{track.track.album.name}</p>
                <p className='pr-5'>{time(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
