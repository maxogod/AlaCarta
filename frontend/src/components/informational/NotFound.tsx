import LoadingScreen from "../shared/LoadingScreen"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div className="fixed inset-0 z-10 text-center flex flex-col items-center justify-center">
                <h1 className="text-3xl sm:text-6xl text-customDarkRed font-bold">
                    You ate too much!
                </h1>
                <p className="text-customDarkRed font-bold">cant find more food</p>
                <div className="flex gap-3">
                    <Link to="/" className="bg-customRed text-white rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-customRed hover:bg-transparent hover:text-customDarkRed ease-in-out duration-300">
                        Go back home
                    </Link>
                </div>
            </div>
            <LoadingScreen />
        </>
    )
}

export default NotFound