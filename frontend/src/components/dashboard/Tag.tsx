const Tag = ({ title, customComponents }: { title: string, customComponents: string }) => {


    return (
        <div className={`pb-0  w-fit pl-2 pr-2 pt-0.5 rounded-xl text-center ${customComponents} text-white font-bold`}>
            {title.length > 50 ? (
                <div className='text-left'>
                    {title.slice(0, title.length / 2)}
                    <br />
                    {title.slice(title.length / 2)}
                </div>
            ) : (
                title
            )}
        </div>
    )
}

export default Tag;