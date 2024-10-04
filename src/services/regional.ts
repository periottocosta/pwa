import { apiClient } from "apiClient";
import { Country, SubDivision } from "interfaces/regional";
import { API, STORAGE_KEYS } from "utils/constants";
import { getInfo, saveInfo } from "utils/storage";
import { transformCountries, transformSubDivisions } from "./transforms/regional";

export const getCountries = async (): Promise<Country[]> => {
    try {

        let countries = getInfo(STORAGE_KEYS.ALL_COUNTRIES);

        if (countries) {
            return JSON.parse(countries);
        }

        const response = await apiClient.get(API.COUNTRY, {
            params: {
                "languageIsoCode": "en"
            }
        });
        const countriesObj = transformCountries(response.data)

        countries = JSON.stringify(countriesObj)
        saveInfo(countries, STORAGE_KEYS.ALL_COUNTRIES);

        return countriesObj;

    } catch (error) {
        throw error;
    }
}

export const getSubDivisions = async (countryCode: string): Promise<SubDivision[]> => {
    try {
        const key = `${STORAGE_KEYS.SUB_DIVISION}_${countryCode}`;
        let subDivisions = getInfo(key);

        if (subDivisions) {
            return JSON.parse(subDivisions);
        }
        const response = await apiClient.get(`${API.SUB_DIVISION}`, {
            params: {
                countryIsoCode: countryCode,
                languageIsoCode: "en"
            }
        });

        const subDivisionsObj = transformSubDivisions(response.data)

        subDivisions = JSON.stringify(subDivisionsObj)
        saveInfo(subDivisions, key);

        return subDivisionsObj;

    } catch (error) {
        throw error;
    }
}