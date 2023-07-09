import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditMenu = ({ setDeploy, currentColor, currentPicture }:
    {
        setDeploy: (deploy: boolean) => void
        currentColor: string | undefined
        currentPicture: string | undefined
    }) => {

    const [color, setColor] = useState<string>(currentColor || "")
    const [picture, setPicture] = useState<string>(currentPicture || "")
    const [error, setError] = useState<string>("")
    const { restaurantUrl } = useParams<{ restaurantUrl: string }>()

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPicture(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        const putMenu = async () => {
            try {
                await axios.put(`http://localhost:8080/api/${restaurantUrl}/menu`, {
                    color: color,
                    banner: picture
                })
                setDeploy(false)
                window.location.reload()
            } catch (err) {
                setError("Something went wrong")
            }
        }
        putMenu()
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5">
                    <h1 className="text-2xl text-center">Edit Menu</h1>
                    <div className="flex flex-col gap-2">
                        <label>Color</label>
                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={color}
                            onChange={handleColor}
                            className="rounded-2xl cursor-pointer p-2 w-full h-20 border"
                            style={{ borderColor: color }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="picture">Picture</label>
                        <input
                            type="text"
                            name="picture"
                            id="picture"
                            value={picture}
                            onChange={handlePicture}
                            placeholder="https://example.com/picture.png"
                            className="rounded-xl bg-customBeige p-2"
                        />
                    </div>

                    {error && <p className="text-customRed font-bold max-w-[15vw] text-center">{error}</p>}

                    <div className="flex justify-center gap-2 mt-5">
                        <button
                            type="submit"
                            className="bg-customRed rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-customRed hover:bg-transparent text-white hover:text-customRed ease-in-out duration-300">
                            Submit
                        </button>
                        <button
                            className="bg-customRed rounded-xl drop-shadow-4xl p-1 sm:p-2 border border-customRed hover:bg-transparent text-white hover:text-customRed ease-in-out duration-300"
                            onClick={() => { setDeploy(false) }}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMenu