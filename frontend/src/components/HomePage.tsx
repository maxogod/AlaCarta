import { useEffect, useState } from "react"

import { Blurhash } from "react-blurhash"
import { BsQuestionSquare } from "react-icons/bs"
import LoginPopup from "./auth/LoginPopUp"
import RestaurantRegisterPopUp from "./auth/RestaurantRegisterPopUp"
import AboutPopUp from "./informational/AboutPopUp"

const src = "https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_Seine_Tour_Eiffel_2.jpg"

const HomePage = () => {
    const [imageLoader, setImageLoader] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showAbout, setShowAbout] = useState(false)

    useEffect(() => {
        if ((showLogin && showAbout) || (showRegister && showAbout)) {
            setShowLogin(false)
            setShowRegister(false)
        }
    }, [showLogin, showRegister, showAbout])

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])

    const toggleLogin = () => {
        setShowLogin(!showLogin)
    }

    const toggleRestaurantRegister = () => {
        setShowRegister(!showRegister)
    }

    const toggleAbout = () => {
        setShowAbout(!showAbout)
    }

    return (
        <>
            <BackgroundImage src={src} imageLoader={imageLoader} />
            <div className="fixed inset-0 flex items-center justify-evenly flex-col">
                <LoginPopup showLogin={showLogin} setShowLogin={setShowLogin} />
                <RestaurantRegisterPopUp showRegister={showRegister} setShowRegister={setShowRegister} />
                <AboutPopUp showAbout={showAbout} setShowAbout={setShowAbout} />
                <div className="fixed inset-0 flex items-center justify-evenly flex-col">
                    <button
                        className="absolute top-0 right-0 m-3"
                        onClick={toggleAbout}>
                        <BsQuestionSquare className="text-5xl text-white" />
                    </button>
                    <h1 className="text-6xl text-white">
                        AlaCarta
                    </h1>
                    <div className="flex items-center justify-center -mt-36 gap-5">
                        <button
                            className="bg-white rounded-xl p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                            onClick={toggleLogin}>Login</button>
                        <button
                            className="bg-white rounded-xl p-2 border border-white hover:bg-transparent hover:text-white ease-in-out duration-300"
                            onClick={toggleRestaurantRegister}>Register Restaurant</button>
                    </div>
                </div>
            </div>
            <footer className="absolute left-2 bottom-0 text-white text-sm">
                ALaCarta 2023 ~ Maximo Utrera, Santiago Sevitz & Francisco Gutierrez
            </footer>
        </>
    )
}

function BackgroundImage({ src, imageLoader }: { src: string, imageLoader: boolean }) {
    return (
        <>
            {!imageLoader && (
                <Blurhash
                    hash='LYGRuJw^S5R*ysn%ozax4=R*t7n~'
                    resolutionX={32}
                    resolutionY={32}
                    punch={1} />
            )}
            {imageLoader && (
                <img
                    className="object-cover blur-sm object-center h-screen w-screen fixed"
                    src={src}
                    alt=""
                />
            )}
        </>
    )
}

export default HomePage
