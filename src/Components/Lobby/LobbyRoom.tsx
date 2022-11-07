import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../pocket/config";
import ErrorFullPage from "../Error/ErrorFullPage";
import LoadingFullScreen from "../LoadingFullScreen";

export default function LobbyRoom(props: any){

    let { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [lobby, setLobby] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    //ref to check if data has been fetched
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if(dataFetchedRef.current) return;


        const fetchLobby = async () => {
            const lobby_id = id ? id : "";
            const lobby = await client.records.getOne('lobbies', lobby_id);

            if(!lobby.waiting){
                throw new Error("This lobby is not waiting for players.");
            }

            setLobby(lobby);
            console.log(lobby);
        }

        fetchLobby().catch((error) => {
            //print error
            setErrorMessage(error.message);
            setError(true);
        }).finally(() => {
            setLoading(false);
        });



        return () => {
            dataFetchedRef.current = true;
        }

    }, []);


    return(
        <>
        {loading  ? <LoadingFullScreen message="Your lobby is being generated, please wait..."/> :
        error ? <ErrorFullPage return_route='/lobby' return='lobbies list' message={errorMessage}/> : 
            <div className="flex flex-wrap -mx-1 overflow-hidden">

                <div className="my-1 px-1 w-full overflow-hidden sm:w-1/4">
                     <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Players</h2>
                    <ul className="space-y-1 max-w-md list-inside text-gray-500 dark:text-gray-400">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            At least 10 characters
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            At least one lowercase character
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                            At least one special character, e.g., ! @ # ?
                        </li>
                    </ul>
                </div>

                <div className="my-1 px-1 w-full overflow-hidden sm:w-2/4">
                    chat
                </div>

                <div className="my-1 px-1 w-full overflow-hidden sm:w-1/4">
                    characters creation
                </div>

            </div>
        }
        
        </>
    );
}