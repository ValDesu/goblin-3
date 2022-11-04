import { ClientResponseError } from "pocketbase";
import { useEffect, useRef, useState } from "react";
import { client } from '../../pocket/config';

interface PlayerProps {
    id: string;
    name: string;
}

export default function Player(props: any) {

    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState<PlayerProps>({id: '', name: ''});

    const dataFetchedRef = useRef<boolean>(false);

    useEffect(() => {

        if (dataFetchedRef.current)  return;
        dataFetchedRef.current = true;

        const fetchPlayer = async () => {
            try {
                const record = await client.records.getOne('profiles', props.data_player_id, {'$autoCancel': false});
                console.log(record);

                setPlayer({id: record.id, name: record.name});
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div role="status" className={loading ? 'animate-pulse' : ''}>
            {!loading ? 
            <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{player.name}</span>
            : 
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
            }
        </div>
    );
}