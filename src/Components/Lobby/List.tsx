import React, { useEffect, useRef, useState } from 'react';
import { client } from '../../pocket/config';
import Loading from '../Loading';
import LobbyCard from './LobbyCard';


export default function List(props: any) {

    const [lobbies, setLobbies] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const dataFetchedRef = useRef(false);

    //fetch all lobbies
    useEffect(() => {

        if (dataFetchedRef.current)  return;
        dataFetchedRef.current = true;

        const fetchLobbies = async () => {
            //console.log('fetching lobbies');

            const records = await client.records.getFullList('lobbies', 200 /* batch size */, {
                sort: '-created',
                
            });
            console.log(records);

            setLobbies(records);
            setLoading(false);
        }

        client.realtime.subscribe('lobbies', function (e) {
            console.log(e);
            if(e.action === 'update') return;
            //update lobbies
            setLoading(true);
            fetchLobbies();
        });


        fetchLobbies();

        return() => {
            client.realtime.unsubscribe('lobbies');
        }

    }, []);

    return (
        <div>
            { loading ? <Loading /> : 
            (
                lobbies.map((lobby: any, index: number) => <LobbyCard
                key={index}
                id={lobby.id}
                name={lobby.name}
                description={lobby.description}
                
                difficulty={lobby.difficulty}
                mode={lobby.mode}

                waiting={lobby.waiting}
                players={lobby.players}
                />)
            )
            }
        </div>
    );
}