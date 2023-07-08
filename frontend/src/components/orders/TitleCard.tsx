import React from 'react';

const TitleCard = ({ title }: { title: string }) => {
    return (
        <h1 className="
                2xl:ml-5 2xl:mt-5
                flex 2xl:justify-start justify-center
                text-center
                sm:text-2xl
                text-customRed font-bold text-lg 2xl:text-3xl">
            {title}
        </h1>
    );
};

export default TitleCard;