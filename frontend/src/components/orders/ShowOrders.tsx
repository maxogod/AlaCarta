import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from '../../@types/stateTypes';
import OrderThumbnail from './OrderThumbnail';
import { IoRestaurantSharp } from 'react-icons/io5';

const ShowOrders = ({ orderStatus }: { orderStatus: number }) => {


    const { restaurantUrl } = useParams()
    const [ordersLoaded, setOrdersLoaded] = useState(false)
    const [orders, setOrders] = useState<OrderType[] | null>();

    const [updateOrders, setUpdateOrders] = useState<boolean>(true);

    useEffect(() => {
        setOrdersLoaded(false)
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/${restaurantUrl}/orders?filterByEnum=${orderStatus}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setOrders(res.data)
                setOrdersLoaded(true)
            } catch (err) {
                console.log(err);

            }
        }
        fetchOrders()
        setUpdateOrders(false)
    }, [updateOrders]);

    return (
        <>
            {
                ordersLoaded ?
                    <div className=' flex flex-col overflow-y-auto h-5/6 items-center gap-2 mt-3 '>
                        {orders?.map((order, index) => (
                            <div key={index}>
                                <OrderThumbnail order={order} setUpdateOrders={setUpdateOrders} />
                            </div>
                        ))}
                    </div>
                    :
                    <div className='flex animate-pulse items-center justify-center h-full'>
                        <IoRestaurantSharp className="text-9xl animate-spin text-customRed" />
                    </div>
            }
        </>
    );
};

export default ShowOrders;