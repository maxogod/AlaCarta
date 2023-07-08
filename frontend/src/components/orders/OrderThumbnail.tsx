import { IconType } from "react-icons";
import { OrderType } from "../../@types/stateTypes";
import { BsDash } from "react-icons/bs";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
const OrderThumbnail = ({ order }: { order: OrderType }) => {

    const acceptOrder = "Acept"
    const denyOrder = "Deny"

    const orderInfo = [
        "#" + order._id.slice(-5),
        <BsDash />,
        "$" + order.price.toString(),
        <BsDash />,
        order.table.padStart(4, '0')
    ]
    return (
        <div className="
        relative
        2xl:w-[180vh] md:w-[170vh] w-[35vh] h-fit py-3 px-5
        bg-white border-customRed rounded-2xl 
        ">
            <div className=" w-fit flex justify-start items-center text-center 2xl:gap-1 gap-0.5 text-xs 2xl:text-lg font-bold text-customRed">
                {orderInfo.map((info, index) => (
                    <div key={index} className="">
                        {info}
                    </div>
                ))}
                <div className="absolute right-5 flex gap-3">
                    <CustomButton title={acceptOrder} altIcon={<IoCheckmarkCircleSharp className="w-5 h-5"/>} customComp={"bg-green-500"} />
                    <CustomButton title={denyOrder} altIcon={<MdCancel className="w-5 h-5"/>} customComp={"bg-customRed"} />
                </div>

            </div>
        </div>

    );
};




const CustomButton = ({ title, altIcon, customComp }: { title: string, altIcon: JSX.Element, customComp: string }) => {


    return (
        <button className={` ${customComp} font-bold text-lg text-white rounded-full lg:rounded-lg lg:px-3 hover:scale-125 transition-transform`}>
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