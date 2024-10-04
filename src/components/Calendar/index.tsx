import React, { FC, ReactNode } from 'react'
import { format, eachDayOfInterval, getDay, parse } from 'date-fns';
import { WEEK_DAYS } from 'utils/constants';
import { PublicHolidayResponse } from 'interfaces/holidays';
import { Badge, UncontrolledTooltip } from 'reactstrap';

import "./style.scss"

interface CalendarProps {
    holidays: PublicHolidayResponse[]
    workingDays: string[]
    firstDay: Date
    lastDay: Date
}

const Calendar: FC<CalendarProps> = ({ holidays, firstDay, lastDay, workingDays }) => {
    const startingDayIndex = getDay(firstDay);
    const daysInMonth = eachDayOfInterval({
        start: firstDay,
        end: lastDay,
    });

    const checkHoliday = (date: Date): ReactNode => {
        const holidayList = holidays.filter(item => {
            return date >= parse(item.startDate, "yyyy-MM-dd", date) && date <= parse(item.endDate, "yyyy-MM-dd", date);
        });

        if (holidayList.length === 0) return <></>;

        return (
            <div>
                {holidayList.map((holiday, index) => {
                    const tooltipId = `holiday-${date.getTime()}-${index}`;
                    return (
                        <React.Fragment key={tooltipId}>
                            <Badge id={tooltipId} color='success'>
                                {holiday.name[0].text}
                            </Badge>
                            <UncontrolledTooltip
                                target={tooltipId}
                            >
                                {holiday.name[0].text}
                            </UncontrolledTooltip>
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    const isWorkingDay = (date: Date): boolean => {
        const weekday = format(date, "E");
        return workingDays.some(day => day.toLowerCase() === weekday.toLowerCase());
    }

    return (
        <>
            <div className='container calendar-container p-0'>

                <div className='d-grid h6 my-3'>
                    {
                        WEEK_DAYS.map((day, index) => (
                            <div key={index} className='col'>{day}</div>
                        ))
                    }
                </div>

                <div className='d-grid calendar-days-container'>
                    {
                        Array.from({ length: startingDayIndex }).map((_, index) => (
                            <div key={`empty-${index}`} className='col'></div>
                        ))
                    }
                    {
                        daysInMonth.map((day) => (
                            <div key={`day-${day}`} className={`calendar-day-item ${isWorkingDay(day) ? "" : "working-day"}`}>
                                {format(day, "d")}
                                {checkHoliday(day)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Calendar;