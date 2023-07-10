import { ReactNode } from "react"

const Banner = ({ children, picture }: { children: ReactNode, picture: string }) => {
    return (
        <div className="relative">
            <img
                className="w-screen h-36 aspect-w-16 aspect-h-9 object-cover rounded-t-3xl drop-shadow-3xl"
                src={picture}
                alt="Restaurant Image" />
            {children}
        </div>
    )
}

export default Banner