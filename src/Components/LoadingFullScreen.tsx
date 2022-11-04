
export default function LoadingFullScreen(props: any) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-900"></div>
                <p className="mt-5 text-2xl font-semibold text-gray-700 text-center">Loading...</p>
                <p className="text-center text-gray-700">{props.message}</p>
            </div>
        </div>
    );
}