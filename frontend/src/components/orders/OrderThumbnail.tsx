import { useState, useEffect } from "react";
import { OrderType } from "../../@types/stateTypes";
import { BsDash } from "react-icons/bs";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderThumbnail = ({ order }: { order: OrderType }) => {

    
    const acceptOrderText = "Acceptar"
    const denyOrderText = "Rechazar"
    const finishOrderText = "Finalizado"
    const cancelOrderText = "Cancelar"
    
    const changeStatusTo = order.statusEnum === 0 ? 1 : 2
    const checkButton = order?.statusEnum === 0 ? acceptOrderText : finishOrderText;
    const checkButtonBg = order?.statusEnum === 0 ? "bg-green-500" : "bg-customOrange";
    const cancelButton = order?.statusEnum === 0 ? denyOrderText : cancelOrderText;

    const orderInfo = [
        { title: "Orden:", name: " #" + order._id.slice(-5) },
        { title: "Total:", name: " $" + order.price.toString() },
        { title: "Mesa:", name: " #" + order.table.padStart(3, '0') }
      ];

    return (
        <div className="
        relative
        2xl:w-[180vh] md:w-[170vh] w-[35vh] h-fit py-3 px-5
        bg-white border-customRed rounded-2xl 
        ">
            <div className=" w-fit flex justify-start items-center text-center 2xl:gap-1 gap-0.5 text-xs 2xl:text-lg font-bold text-customRed">
                {orderInfo.map((info, index) => (
                    <div className="flex gap-1" key={index}>
                        <h1 className="hidden lg:block text-customDarkRed">{info.title}</h1>
                        {info.name}
                        {index !== orderInfo.length - 1 && <BsDash className={"mt-0.5 text-customDarkRed"} />}
                    </div>
                ))}
                <MdExpandMore className="ml-2 h-7 w-7"/>
                <div className="absolute right-5 flex gap-3">
                    {(order.statusEnum < 2) &&
                        <>
                            <CustomButton order={order} statusNumChange={changeStatusTo} title={checkButton} altIcon={<IoCheckmarkCircleSharp className="w-5 h-5" />} customComp={checkButtonBg} />
                            <CustomButton order={order} statusNumChange={3} title={cancelButton} altIcon={<MdCancel className="w-5 h-5" />} customComp={"bg-customRed"} />
                        </>
                    }
                </div>

            </div>
        </div>

    );
};




const CustomButton = ({ title, altIcon, order, statusNumChange, customComp }: { title: string, altIcon: JSX.Element, order: OrderType, statusNumChange: number, customComp: string }) => {

    const { restaurantUrl } = useParams()

    const changeStatus = (order: OrderType, statusType: number) => {
        console.log(order);
        console.log(statusType);
    
        const statusChange = async () => {
            try {
              const res = await axios.put(
                `http://localhost:8080/api/${restaurantUrl}/orders/${order._id}`,
                {
                  statusEnum: statusType,
                },
                {
                  withCredentials: true,
                }
              );
              if (res.status === 404) return;
            } catch (err) {
              return;
            }
          }
          statusChange()
          window.location.reload()
    }


    return (
        <button onClick={() => changeStatus(order, statusNumChange)} className={` ${customComp} font-bold text-lg text-white rounded-full lg:rounded-lg lg:px-3 hover:scale-125 transition-transform`}>
            <div className="hidden lg:block">
                {title}
            </div>
            <div className="lg:hidden block">
                {altIcon}
            </div>
        </button>
    )
}

export default OrderThumbnail;