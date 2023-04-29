import React, { useState } from 'react';
import './DatePicker.css'
import { connect } from 'react-redux'
import DatePickerComponent, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';




const MyContainer = ({ className, children }, Tema) => {
    return (
        <div className={`DatePickerContainer  ${Tema === 'Escuro' ? 'DatePickerContainerEscuro' : 'DatePickerContainerClaro'} `}
        >
            <CalendarContainer className={className}>

                <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
        </div>
    );
};



function CustomHeader({ date, decreaseMonth, increaseMonth }) {
    return (
        <div className="DatePicker-CustomCalendarHeader">
            <button className='DatePicker-CustomCalendarHeader-Button' onClick={decreaseMonth}>
                <FaAngleLeft />
            </button>
            <span className='DatePicker-CustomCalendarHeader-Date'>{
                date.toLocaleString('default', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase()
                +
                date.toLocaleString('default', { month: 'long', year: 'numeric' }).slice(1)
            }</span>
            <button className='DatePicker-CustomCalendarHeader-Button' onClick={increaseMonth}>
                <FaAngleRight />
            </button>
        </div>
    );
}


const DatePicker = (props) => {

    registerLocale('pt-BR', ptBR); // registra o locale em português
    setDefaultLocale('pt-BR'); // define o locale padrão como português



    return (
        <DatePickerComponent
            calendarClassName={`CustomCalendarContainer  ${props.Tema === 'Escuro' ? 'CustomCalendarContainerEscuro' : 'CustomCalendarContainerClaro'} `}
            className={`DatePicker  ${props.Tema === 'Escuro' ? 'DatePickerEscuro' : 'DatePickerClaro'} `}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
            dateFormat="dd/MM/yyyy"
            timeCaption="Hora"

            calendarContainer={(Prop) => MyContainer(Prop, props.Tema)}
            {...props}
            formatWeekDay={(weekdayName) =>
                weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1).substr(0, 2)
            } // deixa a primeira letra do nome do dia em maiúscula
        />
    );
};


const ConnectedDatePicker = connect((state) => {
    return {
        Tema: state.Tema
    }
})(DatePicker)

export default ConnectedDatePicker


