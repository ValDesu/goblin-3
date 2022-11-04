import { useState } from "react";
import { client } from "../../pocket/config";
import ErrorAlert from "../Error/ErrorAlert";


export default function CreateLobby() {

    const [showModal, setShowModal] = useState(false);

    const [gameMode, setGameMode] = useState<string>("Donjon");
    const [gameDif, setGameDif] = useState<number>(3);
    const [gameName, setGameName] = useState<string>("");
    const [gameNum, setGameNum] = useState<number>(1);

    const [error, setError] = useState<string>("");

    const createLobby = async () => {
        if (gameName === "" || gameName.length > 15) {
            setError("Le nom du donjon doit être compris entre 1 et 15 caractères");
            return;
        }

        const user = localStorage.getItem('pocketbase_auth');
        if (user === null) {
            setError("You must be logged in to create a lobby");
            return;
        }

        //create the lobby's chat_room
        let chat_room = null;
        try {
            chat_room = await client.records.create('chat_rooms', {});
            console.log(chat_room);
            setShowModal(false);
        } catch (error) {
            console.log(error);
            setError("An error occured while creating the chat room for your lobby");
            return;
        }



        //Create the lobby
        const profile_id = JSON.parse(user).model.profile.id;

        const data = {
            name: gameName.toString(),
            players: [profile_id],
            waiting: true,
            mode: gameMode,
            difficulty: gameDif,
            max_players: gameNum,
            chat_room: chat_room.id,
        };

        let lobby = null;
        try {
            lobby = await client.records.create('lobbies', data);
            console.log(lobby);
            setShowModal(false);
        } catch (error) {
            console.log(error);
            setError("An error occured while creating your lobby");
            return;
        }

        //redirect to the lobby
        window.location.href = "/lobby/" + lobby.id;

        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => setShowModal(!showModal)} className="w-full block px-4 py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">Create Game</button>
            {showModal ? (
                <div id="medium-modal" tabIndex={-1} className="backdrop-blur-sm flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">

                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {error ? <ErrorAlert message={error} /> : null}
                            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">

                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Create your own game
                                </h3>
                                <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-6">
                                    <label htmlFor="lobbyname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lobby's name</label>
                                    <input value={gameName} min={3} max={15} onChange={(v) => setGameName(v.target.value)} type="text" id="lobbyname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="gamemode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select your game mode</label>
                                    <select id="gamemode" value={gameMode} onChange={(v) => setGameMode(v.currentTarget.value)} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                        <option>Donjon</option>
                                        <option>Town</option>
                                        <option>Adventure</option>
                                        <option>Arena</option>
                                    </select>

                                    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                        {
                                            //add description of each game mode
                                            gameMode === "Donjon" ? "A donjon is a dungeon, a place where you can fight monsters and find treasures." :
                                            gameMode === "Town" ? "A town is a place where you can trade with other players and buy items." :
                                            gameMode === "Adventure" ? "An adventure is a place where you can fight monsters and find treasures." :
                                            gameMode === "Arena" ? "An arena is a place where you can fight other players." :
                                            "Select a game mode"
                                        }
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="gamedif" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select diffilculty</label>
                                    <select id="gamedif" value={gameDif} onChange={(v) => setGameDif(parseInt(v.currentTarget.value))} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value={1}>Pussy</option>
                                        <option value={2}>Easy</option>
                                        <option value={3}>Normal</option>
                                        <option value={4}>Hard</option>
                                        <option value={5}>Soul</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="numberofplayers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Number of players</label>
                                    <input onChange={(v) => setGameNum(parseInt(v.target.value))} type="number" value={gameNum} max={5} min={1} id="numberofplayers" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>

                            </div>

                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={createLobby} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Launch</button>
                                <button onClick={() => { setShowModal(false); setError("") }} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">I'm a coward</button>
                            </div>
                        </div>

                    </div>
                </div>
            ) : null}
        </>
    );
}