import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from '../../@types/stateTypes';
import OrderThumbnail from './OrderThumbnail';

const ShowOrders = ({orderStatus}: {orderStatus: number}) => {


    const { restaurantUrl } = useParams()

    const [orders, setOrders] = useState<OrderType[] | null>();

    const [updateOrders, setUpdateOrders] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/${restaurantUrl}/orders?filterByEnum=${orderStatus}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.status === 404) return
                setOrders(res.data)
            } catch (err) {
                console.log(err);
                
            }
        }
        fetchOrders()
        console.log("fethcing orders...");
        
        setUpdateOrders(false)
    }, [updateOrders]);

    return (
        <div className=' flex flex-col overflow-y-auto h-5/6 items-center gap-2 mt-3 '>
            {orders?.map((order, index) => (
                <div key={index}>
                    <OrderThumbnail order={order} setUpdateOrders={setUpdateOrders} />
                </div>
            ))}
            
        </div>
    );
};

export default ShowOrders;