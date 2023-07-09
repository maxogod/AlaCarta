import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, cleanCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineMinus } from "react-icons/ai"
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiSolidLeftArrow } from "react-icons/bi";


const OrderCart = ({ deploy, setDeploy }:
    {
        deploy: boolean,
        setDeploy: (deploy: boolean) => void
    }) => {

    const dispatch = useDispatch()
    const [tableNumber, setTableNumber] = useState("")
    const { restaurantUrl } = useParams<{ restaurantUrl: string }>()
    const [errors, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const cart = useSelector((state: RootState) => state.cart.cart)

    const handleCheckout = () => {
        setError("")
        setSuccess("")
        if (Object.keys(cart).length === 0) {
            return setError("Please add items to your cart")
        } else if (tableNumber === "") {
            return setError("Please enter a table number")
        }
        if (!restaurantUrl) {
            return setError("Not a valid restaurant")
        }
        let cartProductsIds: string[] = [];
        for (const productId in cart) {
            for (let i = 0; i < cart[productId].quantity; i++) {
                cartProductsIds.push(productId);
            }
        }
        const postOrder = async () => {
            try {
                setIsLoading(true)
                const res = await axios.post(
                    `http://localhost:8080/api/${restaurantUrl}/orders`,
                    { table: tableNumber, products: cartProductsIds },
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 201) {
                    dispatch(cleanCart())
                    setTableNumber("")
                }
                setSuccess("Order placed successfully")
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                setError("Something went wrong")
                return
            }
        }
        postOrder()
    }

    return (
        <>
            {
                deploy &&
                <div className={`bg-white bg-opacity-30 drop-shadow-3xl rounded-s-3xl w-96 p-10 h-full flex flex-col items-center`}>
                    <h1 className="text-3xl font-bold text-customRed">Cart</h1>
                    <hr className="bg-customPink h-1 w-full" />

                    <button
                        className="absolute top-1/2 left-2 rotate-180 text-lg flex justify-center items-center text-customRed bg-white w-8 h-16 rounded-full"
                        onClick={() => { setDeploy(false) }}>
                        <BiSolidLeftArrow />
                    </button>

                    <div className='flex flex-col gap-5 mt-4 items-center overflow-y-scroll overflow-x-hidden w-full -mr-3 h-full'>
                        {Object.entries(cart).map(([productId, props]) => (
                            <CartItem key={productId} id={productId} name={props.name} quantity={props.quantity} price={props.price} />
                        ))}
                    </div>

                    <label htmlFor="tableNumber" className="text-customRed mt-3">Table Number</label>
                    <input
                        type="text"
                        maxLength={6}
                        name="tableNumber"
                        id="tableNumber"
                        className="bg-customBeige text-center rounded-xl p-2 w-full"
                        value={tableNumber}
                        placeholder="e.g. pb1"
                        required
                        onChange={(e) => setTableNumber(e.target.value)} />

                    {errors && <p className="text-customRed font-bold max-w-[15vw] text-center">{errors}</p>}
                    {success && <p className="text-green-600 font-bold max-w-[15vw] text-center">{success}</p>}

                    {
                        isLoading ?
                            <IoRestaurantSharp className="text-6xl m-2 p-2 animate-spin text-customRed" />
                            :
                            <button
                                className="bg-customRed p-2 m-2 rounded-xl text-white"
                                onClick={handleCheckout}>
                                Checkout
                            </button>
                    }
                </div>
            }
        </>
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