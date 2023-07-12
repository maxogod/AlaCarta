import { useEffect, useState } from "react"
import axios from "axios"
// components
import { BsQuestionSquare } from "react-icons/bs"
import LoginPopup from "../auth/LoginPopUp"
import RestaurantRegisterPopUp from "../auth/RestaurantRegisterPopUp"
import AboutPopUp from "../informational/AboutPopUp"
// redux
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../../redux/slices/currentUserSlice"
import UserRestaurants from "./UserRestaurants"
import RegisterAcountPopUp from "../auth/RegisterAcountPopUp"

const HomePage = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showRegisterAccount, setShowRegisterAccount] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const sessionUser = useSelector((state: RootState) => state.currentUser.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if ((showLogin && showAbout) || (showRegister && showAbout) || (showRegisterAccount && showAbout)) {
            setShowLogin(false)
            setShowRegister(false)
            setShowRegisterAccount(false)
        }
    }, [showLogin, showRegister, showRegisterAccount, showAbout])


    const toggleLogin = () => {
        setShowLogin(!showLogin)
    }

    const toggleRestaurantRegister = () => {
        setShowRegister(!showRegister)
    }

    const toggleRegisterAccount = () => {
        setShowRegisterAccount(!showRegisterAccount)
    }

    const toggleAbout = () => {
        setShowAbout(!showAbout)
    }

    const handleLogout = () => {
        (async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) return alert("Logout Failed");
                dispatch(setCurrentUser(null))
            } catch (error) {
                return
            }
        })()
    }

    return (
        <>
            <img
                className="blur-lg object-cover object-center h-screen w-screen fixed"
                src={"https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"}
                alt=""
            />
            <div className="fixed inset-0 flex items-center justify-evenly flex-col">
                <LoginPopup showLogin={showLogin} setShowLogin={setShowLogin} />
                <RestaurantRegisterPopUp showRegister={showRegister} setShowRegister={setShowRegister} />
                <RegisterAcountPopUp showRegisterAccount={showRegisterAccount} setShowRegisterAccount={setShowRegisterAccount} />
                <AboutPopUp showAbout={showAbout} setShowAbout={setShowAbout} />
                <div className="fixed inset-0 flex items-center justify-evenly flex-col">
                    <button
                        className="absolute top-0 right-0 -m-1 sm:m-3 scale-50 sm:scale-100"
                        onClick={toggleAbout}>
                        <BsQuestionSquare className="text-5xl text-white" />
                    </button>
                    <h1 className="sm:text-6xl text-3xl text-white mt-7 text-center">
                        AlaCarta{sessionUser && ` & ${sessionUser?.name}`}
                    </h1>
                    {sessionUser && <UserRestaurants sessionUser={sessionUser} />}
                    <div className="flex sm:flex-row flex-col items-center justify-center gap-5 mt-2 mb-4">
                        {
                            !sessionUser &&
                            <>
                                <button
                                    className="bg-white rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                                    onClick={toggleLogin}>Login</button>
                                <button
                                    className="bg-white rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                                    onClick={toggleRegisterAccount}>Registrar Cuenta</button>
                            </>
                        }
                        {
                            sessionUser &&
                            <button
                                className="bg-white rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                                onClick={handleLogout}>Logout</button>
                        }
                        <button
                            className="bg-white rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                            onClick={toggleRestaurantRegister}>Registrar Restaurante</button>
                    </div>
                </div>
            </div>
            <footer className="absolute left-2 bottom-0 text-white text-xs hidden sm:block">
                ALaCarta 2023 ~ Maximo Utrera, Santiago Sevitz & Francisco Gutierrez
            </footer>
        </>
    )
}


export default HomePage
