import background from '../../assets/background.jpg'
import { IoRestaurantSharp } from 'react-icons/io5'

const LoadingScreen = () => {
    return (
        <>
            <img
                className='object-cover blur-sm object-center h-screen w-screen fixed'
                src={background}
                alt="loading"
            />
            <div className='h-screen w-screen fixed inset-0 flex animate-pulse items-center justify-center'>
                <IoRestaurantSharp className="text-9xl animate-spin text-customRed" />
            </div>
        </>
    )
}

export default LoadingScreen