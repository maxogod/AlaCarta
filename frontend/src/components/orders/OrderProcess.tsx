import ContentPane from "../shared/ContentPane";
import ShowOrders from "./ShowOrders";
import TitleCard from "./TitleCard";

const OrderProcess = () => {

    const orderProcessTitle = "Proceso de Pedidos"

    return (
        <>
            <ContentPane>
                <TitleCard title={orderProcessTitle} />
                <ShowOrders orderStatus={1}/>
            </ContentPane>
        </>
    )
};

export default OrderProcess;