import React, { useState } from 'react';
import './RangePicker.css'
import { connect } from 'react-redux'
import RangePickerComponent, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';




const MyContainer = ({ className, children }, Tema) => {
    return (
        <div className={`RangePickerContainer  ${Tema === 'Dark' ? 'RangePickerContainerDark' : 'RangePickerContainerLightTheme'} `}
        >
            <CalendarContainer className={className}>

                <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
        </div>
    );
};



function CustomHeader({ date, decreaseMonth, increaseMonth }) {
    return (
        <div className="RangePicker-CustomCalendarHeader">
            <button className='RangePicker-CustomCalendarHeader-Button' onClick={decreaseMonth}>
                <FaAngleLeft />
            </button>
            <span className='RangePicker-CustomCalendarHeader-Date'>{
                date.toLocaleString('default', { month: 'long', year: 'numeric' }).charAt(0).toUpperCase()
                +
                date.toLocaleString('default', { month: 'long', year: 'numeric' }).slice(1)
            }</span>
            <button className='RangePicker-CustomCalendarHeader-Button' onClick={increaseMonth}>
                <FaAngleRight />
            </button>
        </div>
    );
}


const RangePicker = (props) => {

    registerLocale('pt-BR', ptBR); // registra o locale em português
    setDefaultLocale('pt-BR'); // define o locale padrão como português

    const renderRangeLabel = ({ startDate, endDate, focusedInput }) => {
        //console.log("RECEBIDO", startDate)
        if (!startDate || !endDate) {
            return 'Selecione um período';
        }
        return `De ${format(startDate, 'dd/MM/yyyy')} até ${format(endDate, 'dd/MM/yyyy')}`;
    };


    return (
        <RangePickerComponent
            calendarClassName={`CustomCalendarContainer  ${props.Tema === 'Dark' ? 'CustomCalendarContainerDark' : 'CustomCalendarContainerLightTheme'} `}
            className={`RangePicker  ${props.Tema === 'Dark' ? 'RangePickerDark' : 'RangePickerLightTheme'} `}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
            dateFormat="dd/MM/yyyy"
            timeCaption="Hora"

            showTimeSelect={true}
            renderRangeLabel={() => { }}
            calendarContainer={(Prop) => MyContainer(Prop, props.Tema)}
            {...props}
            formatWeekDay={(weekdayName) =>
                weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1).substr(0, 2)
            } // deixa a primeira letra do nome do dia em maiúscula

        />
    );
};


const ConnectedRangePicker = connect((state) => {
    return {
        Tema: state.Tema
    }
})(RangePicker)

export default ConnectedRangePicker


