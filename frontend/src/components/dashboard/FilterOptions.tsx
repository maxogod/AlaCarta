import { useState } from 'react'
import React from 'react';
import Tag from './Tag';

const FilterOptions = ({ setFilterOption }: { setFilterOption: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

    const [currentOption, setCurrentOption] = useState<string>("")

    const FilterOptions = [
        "Hoy", "Esta Semana", "Este Mes", "Ultimos 6 Meses", "Este Año", "Personalizado"
    ]

    const handleOnClick = (option: string) => {
        setFilterOption(option)
        setCurrentOption(option)
    }

    return (
        <div className="ml-4 flex justify-start gap-8">
            {FilterOptions.map((option, index) => (
                <div key={index} className="cursor-pointer hover:scale-125 transition-all">
                    <div
                        onClick={() => handleOnClick(option)}
                        className={`pb-0 w-fit pt-0.5 rounded-xl text-center ${currentOption === option ? 'bg-customRed scale-110' : 'bg-customDarkRed'
                            } pl-4 pr-4 hover:bg-customRed transition-all text-white font-bold`}>
                        {option}
                    </div>
                </div>
            ))}
        </div>

    )
}

const RangeDatePicker = ({ customStartDate, customEndDate, setCustomStartDate, setCustomEndDate }: { customStartDate: Date | undefined, customEndDate: Date | undefined, setCustomStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>, setCustomEndDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) => {



    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomStartDate(selectedDateObject);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomEndDate(selectedDateObject);
    };

    return (
        <div className="flex">
            <div className="mr-2 ">
                <Tag title={"Fecha de Inicio"} customComponents='bg-customRed mb-1' />
                <input
                    type="date"
                    value={customStartDate ? customStartDate.toISOString().substr(0, 10) : ''}
                    onChange={handleStartDateChange}
                    className="border border-customRed font-bold bg-customBeige rounded-3xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-customRed"
                />
            </div>
            <div className=''>
                <Tag title={"Fecha de Fin"} customComponents='bg-customRed mb-1' />
                <input
                    type="date"
                    value={customEndDate ? customEndDate.toISOString().substr(0, 10) : ''}
                    onChange={handleEndDateChange}
                    className="border border-customRed font-bold bg-customBeige rounded-3xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-customRed"
                />
            </div>
        </div>
    );
};

export  {FilterOptions, RangeDatePicker};