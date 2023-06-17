import { useState } from 'react'
import { passwordIsValid, urlSuffixIsValid } from './auth.utils'

import { IoRestaurantSharp } from "react-icons/io5"

const RestaurantRegisterPopUp = ({ showRegister, setShowRegister }:
    { showRegister: boolean, setShowRegister: Function }) => {

    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        urlSuffix: '',
        email: '',
        password: '',
        cbu: '',
    })
    const [errors, setErrors] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    }

    const handleClosePopUp = () => {
        setShowRegister(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!urlSuffixIsValid(registerInfo.urlSuffix)) {
            setErrors('Url must contain only letters and numbers')
            return
        }
        if (!passwordIsValid(registerInfo.password)) {
            setErrors('Password must be at least 8 characters long and contain at least one number')
            return
        }
    }


    return (
        <div className={`max-h-[90vh] max-w-[95vw] overflow-y-scroll fixed pop-in-out bg-customBeige p-7 rounded-lg ${showRegister ? 'visible z-10' : ''}`}>
            <div onClick={handleClosePopUp} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-6xl text-customRed cross-icon" />
                <h1 className="text-6xl text-customRed">AlaCarta</h1>
            </div>
            <hr className="bg-customPink h-1" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center gap-5 mt-4">
                    <h1 className="text-4xl">Register Your Restaurant!</h1>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="name">Restaurant Name</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="e.g. A la Carta"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="urlSuffix">Preffered Url (part after /@)</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="text"
                            name="urlSuffix"
                            id="urlSuffix"
                            placeholder="e.g. AlaCartaUrl"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="email">Owner Email</label>
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
                        <label htmlFor="password">Owner Password</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="e.g. password123"
                            required
                            onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="cbu">Cbu o Alias</label>
                        <input
                            className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                            type="text"
                            name="cbu"
                            id="cbu"
                            placeholder="e.g. 017020466000..."
                            required
                            onChange={handleChange} />
                    </div>
                    {errors && <p className="text-customRed max-w-[15vw] text-center">{errors}</p>}
                    <button
                        className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                        type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RestaurantRegisterPopUp