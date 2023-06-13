import { useState } from 'react'

import { IoRestaurantSharp } from "react-icons/io5"

const LoginPopUp = ({ showLogin, setShowLogin }:
    { showLogin: boolean, setShowLogin: Function }) => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const handleClosePopUp = () => {
        setShowLogin(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className={`max-h-[90vh] max-w-[95vw] overflow-y-scroll fixed shadow-2xl pop-in-out bg-customBeige p-7 rounded-lg ${showLogin ? 'visible z-10' : ''}`}>
            <div onClick={handleClosePopUp} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-6xl text-customRed cross-icon" />
                <h1 className="text-6xl text-customRed">AlaCarta</h1>
            </div>
            <hr className="bg-customPink h-1" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-5 mt-4">
                    <h1 className="text-4xl">Login</h1>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="email">Email</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="e.g. alacarta@email.com"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="e.g. password123"
                            required
                            onChange={handleChange} />
                    </div>
                    <button
                        className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                        type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPopUp