import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"


const OrderCart = () => {

    const cart = useSelector((state: RootState) => state.cart.cart)

    const handleCheckout = () => { }

    return (
        <div className={`bg-white bg-opacity-30 drop-shadow-3xl rounded-s-3xl w-96 p-2 pt-10 h-full flex flex-col items-center`}>
            <h1 className="text-3xl font-bold text-customRed">Cart</h1>
            <hr className="bg-customPink h-1 w-full" />

            <div className='flex flex-col gap-5 mt-4 items-center overflow-y-scroll overflow-x-hidden w-full -mr-3 h-full'>
                {Object.entries(cart).map(([productId, props]) => (
                    <CartItem key={productId} id={productId} name={props.name} quantity={props.quantity} price={props.price} />
                ))}
            </div>

            <button
                className="bg-customRed p-2 m-2 rounded-xl text-white"
                onClick={handleCheckout}>
                Checkout
            </button>
        </div>
    )
}

function CartItem({ id, name, quantity, price }: { id: string, name: string, quantity: number, price: number }) {

    const dispatch = useDispatch()
    const handleAdd = () => {
        dispatch(addToCart({ productId: id, name, price }))
    }

    const handleSubtract = () => {
        dispatch(removeFromCart({ productId: id }))
    }

    return (
        <div className="relative flex flex-col text-left bg-customBeige rounded-2xl w-full p-3 px-5 text-sm">
            <div className="m-3 flex flex-col gap-5 absolute top-0 right-0 text-customRed">
                <button
                    onClick={handleAdd}>
                    <AiOutlinePlus />
                </button>
                <button
                    onClick={handleSubtract}>
                    <AiOutlineMinus />
                </button>
            </div>
            <h1 className="font-bold">
                {name}
            </h1>
            <p>Cantidad: {quantity}</p>
            <p>Precio: ${price}</p>
        </div>
    )
}

export default OrderCart;