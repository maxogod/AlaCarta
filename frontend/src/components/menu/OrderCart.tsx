
const OrderCart = () => {

    return (
        <div className={`bg-white bg-opacity-30 drop-shadow-3xl rounded-s-3xl w-72 p-10 h-full flex flex-col items-center`}>
            <h1 className="text-3xl font-bold text-customRed">Cart</h1>
            <hr className="bg-customPink h-1 w-full" />

            <div className='flex flex-col gap-5 mt-4 items-center overflow-y-scroll overflow-x-hidden w-full h-full'>
            </div>
        </div>
    )
}


export default OrderCart;