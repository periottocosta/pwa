import { Country, RegionalResponse, SubDivision, SubDivisionResponse } from "interfaces/regional";


export const transformCountries = (data: RegionalResponse[]): Country[] => {
    try {
        return data.map((item: RegionalResponse) => {
            return {
                name: item.name[0].text,
                isoCode: item.isoCode,
                officialLanguages: item.officialLanguages
            }
        }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        throw error;
    }
}

export const transformSubDivisions = (data: SubDivisionResponse[]): SubDivision[] => {
    try {
        return data.map((item: SubDivisionResponse) => {
            return {
                code: item.code,
                isoCode: item.isoCode,
                name: item.name[0].text,
                shortName: item.shortName,
                category: item.category[0].text,
                officialLanguages: item.officialLanguages
            }
        }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        throw error;
    }
}