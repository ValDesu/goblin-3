import { useEffect, useRef, useState } from "react";
import { client } from '../../pocket/config';
import Player from "./Player";

interface LobbyCardProps {
    id : string,
    name : string,
    description : string,
    waiting : boolean,
    difficulty : string,
    mode : string,
    players : Array<string>,
}

export default function LobbyCard(props: any) {

    const default_lobby : LobbyCardProps = {id : props.id, name : props.name, description : props.description, waiting : props.waiting, players : props.players, difficulty : props.difficulty, mode : props.mode};
    const [lobby, setLobby] = useState<LobbyCardProps>(default_lobby);

    useEffect(() => {
        client.realtime.subscribe('lobbies/' + props.id ,function (e) {
            console.log(e);

            const lobby_updated : LobbyCardProps ={
                id : e.record.id,
                name : e.record.name,
                description : e.record.description,
                waiting : e.record.waiting,
                players : e.record.players,
                difficulty : e.record.difficulty,
                mode : e.record.mode,
            }
            
            setLobby(lobby_updated);
        });

    }, []);

    const difficultySwitch = (difficulty : number) =>  {
        switch (difficulty) {
            case 0:
                return "Easy";
            case 1:
                return "Medium";
            case 2:
                return "Hard";
            case 3:
                return "Very Hard";
            case 4:
                return "Insane";
            case 5:
                return "Impossible";
            default:
                return "Unknown";
        }
    };


    const difficultyColor = (difficulty : number) => {
        switch (difficulty) {
            case 0:
                return "bg-green-100 text-green-800";
            case 1:
                return "bg-yellow-100 text-yellow-800";
            case 2:
                return "bg-red-100 text-red-800";
            case 3:
                return "bg-purple-100 text-purple-800";
            case 4:
                return "bg-pink-100 text-pink-800";
            case 5:
                return "bg-black text-white";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    
    return (
        
        <div key={lobby.id} className="mt-3 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{lobby.name}</h5>
            </a>
            <span className={lobby.waiting ? 'bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900' : 'bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900'} >{lobby.waiting ? 'Waiting...' : 'In Donjon'}</span>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Entering the <span className="font-semibold text-gray-900 dark:text-white">{lobby.mode}</span> mode, you will have to fight against <span className={difficultyColor(parseInt(lobby.difficulty))}> {difficultySwitch(parseInt(lobby.difficulty))}</span> monsters.
            </p>
            <button disabled={!lobby.waiting}  className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg ${lobby.waiting ? 'focus:ring-4 hover:bg-blue-800 bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'focus:outline-none bg-gray-700  dark:bg-gray-600  cursor-not-allowed'}`}>
                {lobby.waiting ? 'Join this game' : 'Not available'}
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <div className="space-y-2.5 max-w-lg mt-3">
                <div className="flex items-center space-x-2 w-full">
                { //TODO: separate component
                    lobby.players.map((player : string, index: number) => <Player key={index} data_player_id={player} />)
                }
                </div>
            </div>
            
        </div>
    );
}