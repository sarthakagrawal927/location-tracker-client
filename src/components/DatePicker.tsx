import React, { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type DatepickerInputProps = {
    activeDate: Date,
    setActiveDate: Dispatch<SetStateAction<Date>>
}

const SimpleDatePicker = ({ activeDate, setActiveDate }: DatepickerInputProps) => {
    return (
        <DatePicker selected={activeDate} onChange={(date: Date) => setActiveDate(date)} />
    );
};

export default SimpleDatePicker