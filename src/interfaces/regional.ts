import { Info } from "./commons";

export interface RegionalResponse {
    isoCode: string;
    name: Info[];
    officialLanguages: string[];
}

export interface Country {
    isoCode: string;
    name: string;
    officialLanguages: string[];
}

export interface SubDivisionResponse {
    code: string;
    isoCode: string;
    shortName: string;
    category: Info[];
    name: Info[];
    officialLanguages: string[];
}

export interface SubDivision {
    code: string;
    isoCode: string;
    name: string;
    shortName: string;
    category: string;
    officialLanguages: string[];
}