import { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import background from '../../assets/background.jpg'

function BackgroundImage() {

    const src = background

    const [imageLoader, setImageLoader] = useState(false)
    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setImageLoader(true)
        }
        img.src = src
    }, [src])

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

export default BackgroundImage