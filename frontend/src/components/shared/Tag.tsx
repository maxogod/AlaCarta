import { ImCancelCircle } from 'react-icons/im'

const Tag = ({ title, customComponents }: { title: string, customComponents: string }) => {


    return (
        <div className={`pb-0 w-fit pl-2 pr-2 pt-0.5 rounded-xl text-center ${customComponents} text-white font-bold`}>
            {title.length > 50 ? (
                <div className='text-left overflow-ellipsis'>
                    {title}
                </div>
            ) : (
                title
            )}
        </div>
    )
}

const EditTag = ({ title, customComponents, onCancelClick }: { title: string, customComponents: string, onCancelClick?: () => void }) => {


    return (
        <div className={` flex gap-2  w-fit px-3 py-1 text-lg rounded-full text-left ${customComponents} text-white `}>
            {title.length > 50 ? (
                <div className='text-left'>
                    {title.slice(0, title.length / 2)}
                    <br />
                    {title.slice(title.length / 2)}
                </div>
            ) : (
                title
            )}
            <div className='mt-1.5'>
                <div className='ml-3 scale-125 hover:scale-150 transition-transform cursor-pointer' onClick={onCancelClick}>
                    {<ImCancelCircle />}
                </div>
            </div>

        </div>
    )
}



const PieChartTag = ({title, index}: {title: string, index: number}) => {
    
    const getTopColor = (index: number): string => {
        switch (index) {
            case 0:
                return "bg-customOrange";
            case 1:
                return "bg-customRed";
            case 2:
                return "bg-blue-500";
            default:
                return "bg-yellow-600";
        }
    };

    return (
        <div key={index}
            className={`${getTopColor(index)} text-white 2xl:text-lg text-xs font-bold text-center   py-0.5 2xl:py-1 rounded-2xl w-full px-3 `}
            >{title}</div>
    );
};


export { PieChartTag, EditTag, Tag };