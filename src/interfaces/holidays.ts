import { Info } from "./commons";

export interface PublicHolidayResponse {
    id: string;
    startDate: string;
    endDate: string;
    type: string;
    nationwide: boolean;
    subdivisions: {
        code: string;
        shortName: string;
    }[];
    name: Info[];
}
