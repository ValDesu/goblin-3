import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../pocket/config";
import ErrorFullPage from "../Error/ErrorFullPage";

export default function LobbyRoom(props: any){

    let { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [lobby, setLobby] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        console.log(id);
        if(!id){return;} //never happens

        try {
            //fetch lobby
            client.records.getOne('lobbies', id.toString());
        } catch (error) {
            console.log(error);
        }

        //stop useEffect from running again
        return () => {
            console.log('unmounted');
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return(
        
        <ErrorFullPage return_route='/lobby' return='lobbies list' message={'The lobby you\'re looking for doesn\'t seem to exist, try again.'}/>
    );
}