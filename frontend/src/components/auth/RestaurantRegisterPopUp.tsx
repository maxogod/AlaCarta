import { useState } from 'react'
import { passwordIsValid, urlSuffixIsValid } from './auth.utils'
import axios from 'axios'
import { IoRestaurantSharp } from "react-icons/io5"
// redux
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/slices/currentUserSlice'

const restaurantInfoFields = [
    { name: 'name', title: 'Nombre del Restaurante', type: 'text', required: true, placeholder: 'e.j. A la Carta' },
    { name: 'urlSuffix', title: 'URL deseable (parte después de /@)', type: 'text', required: true, placeholder: 'e.j. AlaCartaUrl' },
    { name: 'cbu', title: 'Cbu ó Alias', type: 'text', required: true, placeholder: 'e.j. 017020466000...' },
]

const ownerInfoFields = [
    { name: 'email', title: 'Email del dueño', type: 'email', required: true, placeholder: 'e.j. alacarta@email.com' },
    { name: 'ownerName', title: 'Nombre del dueño', type: 'text', required: false, placeholder: 'e.gj. Gordon Ramsay' },
    { name: 'password', title: 'Contraseña del dueño', type: 'password', required: false, placeholder: 'e.j. qwerty123' },
]

const RestaurantRegisterPopUp = ({ showRegister, setShowRegister }:
    // eslint-disable-next-line @typescript-eslint/ban-types
    { showRegister: boolean, setShowRegister: Function }) => {

    const [step, setStep] = useState(1)
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        urlSuffix: '',
        ownerName: '',
        email: '',
        password: '',
        cbu: '',
    })
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value })
    }

    const handleClosePopUp = () => {
        setShowRegister(false)
    }

    const handleBack = () => {
        setErrors('')
        setStep(1)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors('')
        if (step === 1) {
            if (!urlSuffixIsValid(registerInfo.urlSuffix)) {
                setErrors('Url must contain only letters and numbers')
                return
            }
            setStep(2)
            return
        } else if (step === 2) {
            if (registerInfo.password && !passwordIsValid(registerInfo.password)) {
                setErrors('Password must be at least 8 characters long and contain at least one number')
                return
            }
        }
        (async () => {
            try {
                const res = await axios.post(
                    "http://localhost:8080/api/auth/registerRestaurant",
                    {
                        name: registerInfo.name,
                        urlSuffix: registerInfo.urlSuffix,
                        paymentInfo: registerInfo.cbu,
                        ownerName: registerInfo.ownerName,
                        ownerEmail: registerInfo.email,
                        ownerPassword: registerInfo.password,
                    },
                    {
                        withCredentials: true,
                    }
                );

                const { owner } = res.data;
                dispatch(setCurrentUser(owner))
                setShowRegister(false)
                window.location.reload() // TODO <- this is sussy
            } catch (err) {
                setErrors("Url is already taken or Information is invalid")
            }
        })();
    }


    return (
        <div className={`max-h-[90vh] max-w-[95vw] overflow-wrap overflow-y-scroll fixed pop-in-out bg-customBeige p-7 rounded-lg ${showRegister ? 'visible z-10' : ''}`}>
            <div onClick={handleClosePopUp} className="flex items-center justify-center rotate-hover cursor-pointer">
                <IoRestaurantSharp className="text-3xl sm:text-6xl text-customRed cross-icon" />
                <h1 className="text-3xl sm:text-6xl text-customRed">AlaCarta</h1>
            </div>
            <hr className="bg-customPink h-1" />
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="flex flex-col items-center justify-center gap-5 mt-4">
                        <h1 className="text-2xl sm:text-4xl text-center">Paso 1: Información del Restaurante</h1>
                        {restaurantInfoFields.map(field => (
                            <div key={field.name} className="flex flex-col gap-5">
                                <label htmlFor={field.name}>{field.title}</label>
                                <input
                                    className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    onChange={handleChange} />
                            </div>
                        ))}

                        {errors && <p className="text-customRed max-w-[15vw] text-center">{errors}</p>}
                        <button
                            className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                            type="submit">Siguiente Paso</button>
                    </div>
                )}
                {step === 2 && (
                    <div className="flex flex-col items-center justify-center gap-5 mt-4">
                        <h1 className="text-2xl sm:text-4xl text-center">Paso 2: Informacion del dueño</h1>
                        <p className='max-w-[20rem] text-sm text-center'
                        >Puedes dejar el <i>nombre</i> y <i>apellido</i> vacio
                         si ya tienes una cuenta creada con este email</p>

                        {ownerInfoFields.map(field => (
                            <div key={field.name} className="flex flex-col gap-5">
                                <label htmlFor={field.name}>{field.title}</label>
                                <input
                                    className="border border-customRed focus:border-customOrange focus:outline-none rounded-xl p-2"
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    onChange={handleChange} />
                            </div>
                        ))}

                        {errors && <p className="text-customRed max-w-[15vw] text-center">{errors}</p>}
                        <div className='flex gap-1'>
                            <button
                                onClick={handleBack}
                                className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                            >Volver</button>
                            <button
                                className="bg-customRed border border-customRed rounded-xl p-2 text-white hover:bg-opacity-20 hover:font-bold hover:text-customOrange ease-in-out duration-300"
                                type="submit">Registrar</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default RestaurantRegisterPopUp