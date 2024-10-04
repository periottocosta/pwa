import { Country, SubDivision } from "./regional";

export interface UserSettings {
    workingDays: string[];
    country: Country;
    subDivision: SubDivision;
}