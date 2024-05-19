import React from 'react'
import { getProviders, signIn } from 'next-auth/react';
function login({ providers }) {
    return (
        <div className='flex flex-col items-center min-h-screen w-full justify-center'>
            <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' alt='Spotify Logo' width='200' height='200' />
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className='pt-5'>
                    <button className='bg-[#1ed760] p-5  rounded-full' onClick={() => signIn(provider.id, { callbackUrl: "/" })}>Login with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}
