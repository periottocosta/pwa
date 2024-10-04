import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addMonths, endOfMonth, format, startOfMonth, subDays } from "date-fns";

import Wrapper from "components/Wrapper";
import Calendar from "components/Calendar";
import ConfigModal from "components/ConfigModal";

import { getInfo, saveInfo } from "utils/storage";
import { STORAGE_KEYS } from "utils/constants";

import { UserSettings } from "interfaces/user";
import { Country, SubDivision } from 'interfaces/regional';
import { PublicHolidayResponse } from "interfaces/holidays";

import { getPublicHolidays } from "services/holidays";

const HomePage = () => {

    const [showModal, setShowModal] = useState(false);
    const [enableCloseModal, setEnableCloseModal] = useState(true);
    const [workingDays, setWorkingDays] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedSubDivision, setSelectedSubDivision] = useState<SubDivision | null>(null);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [lastDayOfMonth, setLastDayOfMonth] = useState(endOfMonth(currentDate));
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(startOfMonth(currentDate));

    const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
    const [holidays, setHolidays] = useState<PublicHolidayResponse[]>([]);


    const toggleConfigModal = () => {
        if (enableCloseModal) {
            setShowModal(!showModal);
        }
    }

    const saveSettings = (
        country: Country, subDivision: SubDivision, workingDays: string[]
    ) => {
        try {
            const userSettings: UserSettings = {
                country,
                subDivision,
                workingDays
            };

            setUserSettings(userSettings);
            saveInfo(JSON.stringify(userSettings), STORAGE_KEYS.USER_SETTINGS);
            setShowModal(!showModal);
        } catch (error) {
            throw error;
        }
    }

    const getHolidays = async () => {
        if (userSettings == null) return

        const country = userSettings.country.isoCode
        const subDivision = userSettings.subDivision.code

        try {
            const holidays = await getPublicHolidays(
                country,
                subDivision,
                format(firstDayOfMonth, 'yyyy-MM-dd'),
                format(lastDayOfMonth, 'yyyy-MM-dd'),
            );

            setHolidays(holidays);
        } catch (error) {
            throw error;
        }
    }

    const goNext = () => {
        const nextMonth = addMonths(startOfMonth(currentDate), 1);
        setCurrentDate(nextMonth);
    };

    const goPrev = () => {
        const prevMonth = subDays(startOfMonth(currentDate), 1);
        setCurrentDate(prevMonth);
    };

    useEffect(() => {
        const aux = getInfo(STORAGE_KEYS.USER_SETTINGS)

        if (aux == null) {
            setEnableCloseModal(false)
            setShowModal(true);
            return
        }

        const userSettings: UserSettings = JSON.parse(aux);

        setUserSettings(userSettings);
    }, []);

    useEffect(() => {
        if (userSettings == null) return;

        setEnableCloseModal(true);
        setWorkingDays(userSettings.workingDays);
        setSelectedCountry(userSettings.country);
        setSelectedSubDivision(userSettings.subDivision);

        getHolidays();
    }, [userSettings]);

    useEffect(() => {
        getHolidays();
    }, [lastDayOfMonth, firstDayOfMonth]);

    useEffect(() => {
        setLastDayOfMonth(endOfMonth(currentDate));
        setFirstDayOfMonth(startOfMonth(currentDate));
    }, [currentDate]);

    return (
        <Wrapper
            next={goNext}
            prev={goPrev}
            title={format(currentDate, 'MMMM yyyy')}
        >
            <ConfigModal
                isOpen={showModal}
                toggle={toggleConfigModal}
                save={saveSettings}
                selectedCountry={selectedCountry}
                selectedSubDivision={selectedSubDivision}
                workingDays={workingDays}
                setSelectedCountry={setSelectedCountry}
                setSelectedSubDivision={setSelectedSubDivision}
                setWorkingDays={setWorkingDays}
            />

            <Calendar
                holidays={holidays}
                workingDays={workingDays}
                firstDay={firstDayOfMonth}
                lastDay={lastDayOfMonth}
            />

            <Button
                color="primary"
                className="btn-float-config"
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon icon={faGear} />
            </Button>
        </Wrapper>
    );
}

export default HomePage;