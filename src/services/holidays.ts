import { apiClient } from "apiClient";
import { API, STORAGE_KEYS } from "utils/constants";
import { transformHolidays } from "./transforms/holidays";
import { PublicHolidayResponse } from "interfaces/holidays";
import { format } from "date-fns";
import { getInfo, saveInfo } from "utils/storage";

export const getPublicHolidays = async (
    country: string,
    subDivision: string,
    startDate: string,
    endDate: string
): Promise<PublicHolidayResponse[]> => {
    try {
        const key = `${STORAGE_KEYS.HOLIDAYS}_${country}_${subDivision}__${format(startDate, 'Y_M')}__${format(endDate, 'Y_M')}`;
        const holidays = getInfo(key);

        if (holidays) {
            return JSON.parse(holidays);
        }

        const response = await apiClient.get(API.HOLIDAYS, {
            params: {
                countryIsoCode: country,
                languageIsoCode: "EN",
                subdivisionCode: subDivision,
                validFrom: startDate,
                validTo: endDate,
            }
        });

        const holidaysObj = transformHolidays(response.data);
        saveInfo(JSON.stringify(holidaysObj), key);

        return holidaysObj;
    } catch (error) {
        throw error;
    }
};

export const getSchoolHolidays = async () => {
    try {
        const response = await apiClient.get(API.SCHOOL_HOLIDAYS);
        return response.data;
    } catch (error) {
        throw error;
    }
};