import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderType } from '../../@types/stateTypes';
import OrderThumbnail from './OrderThumbnail';

const ShowOrders = ({orderStatus}: {orderStatus: number}) => {


    const { restaurantUrl } = useParams()

    const [orders, setOrders] = useState<OrderType[] | null>();

    const ordersMock = orders?.flatMap(item => [item, { ...item }]);

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
                return
            }
        }
        fetchOrders()
    }, []);

    return (
        <div className=' flex flex-col overflow-y-auto h-5/6 items-center gap-2 mt-3 '>
            {ordersMock?.map((order, index) => (
                <div key={index}>
                    <OrderThumbnail order={order} />
                </div>
            ))}
            
        </div>
    );
};

export default ShowOrders;