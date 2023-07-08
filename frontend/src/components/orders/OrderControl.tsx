import ContentPane from "../shared/ContentPane";
import ShowOrders from "./ShowOrders";
import TitleCard from "./TitleCard";

const OrderControl = () => {

    const orderControlTitle = "Control de Pedidos"

    return (
        <>
            <ContentPane>
                <TitleCard title= {orderControlTitle}/>
                <ShowOrders orderStatus={0}/>
            </ContentPane>
        </>
    )
}

export default OrderControl;