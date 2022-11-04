
import { useState } from 'react';
import CreateLobby from './CreateLobby';
import List from './List';

export default function Lobby() {

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            
            <div className="w-96 bg-white rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-semibold text-gray-700 text-center">Lobbies</h2>
                <CreateLobby/>

                <hr className="my-6 border-gray-300 w-full" />
                
                <List/>

            </div>
        </div>
    );
}