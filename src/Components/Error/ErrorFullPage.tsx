import GoblinErr from '../../Images/goblin-err.svg';

export default function ErrorFullPage(props: any) {

    return (
        <>
        <style type='text/css'>
            {
                `
                @keyframes bounce {
                    33% {top: 0px;}
                    66% {top: 20px;}
                    100% {top: 0px;}
                }

                .bounce {
                    animation: bounce 1.5s infinite ease-in-out;  
                    position: relative;
                }
                `

            }
        </style>

        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-96 bg-white rounded-lg shadow-xl p-6">
                <img className='bounce' src={GoblinErr} alt="Goblin face" />
                <h2 className="text-3xl font-semibold text-gray-700 text-center">Error</h2>
                <p className="text-gray-600 text-center">{props.message}</p>
                <br /><hr /><br />

                <div className="flex justify-center">
                    <a className="inline-block align-baseline focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" href={props.return_route}>Return to {props.return}</a>
                </div>
            </div>
        </div>
        </>
    );
}