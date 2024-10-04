import { PublicHolidayResponse } from "interfaces/holidays";

export const transformHolidays = (holidays: PublicHolidayResponse[]): PublicHolidayResponse[] => {
    return holidays.map((holiday) => ({
        ...holiday,
    }));
}