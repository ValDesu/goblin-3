
export default function ErrorAlert(props: any) {

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute" role="alert">
            <svg className="block inline w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <strong className="font-bold block sm:inline">Error : </strong>
            <span className="block sm:inline">{props.message}</span>
        </div>
    );
}