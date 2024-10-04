import React, { useEffect, useState } from 'react';
import { Country, SubDivision } from 'interfaces/regional';
import { getCountries, getSubDivisions } from 'services/regional';
import { WEEK_DAYS } from 'utils/constants';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

interface ConfigModalProps {
    isOpen: boolean;
    toggle: () => void;
    save: (country: Country, subDivision: SubDivision, workingDays: string[]) => void;
    selectedCountry: Country | null;
    selectedSubDivision: SubDivision | null;
    workingDays: string[];
    setSelectedCountry: (country: Country) => void;
    setSelectedSubDivision: (subDivision: SubDivision) => void;
    setWorkingDays: (workingDays: string[]) => void;
}
const ConfigModal: React.FC<ConfigModalProps> = ({
    toggle,
    isOpen,
    save,
    selectedCountry,
    selectedSubDivision,
    workingDays,
    setSelectedCountry,
    setSelectedSubDivision,
    setWorkingDays
}) => {
    const [countries, setCountries] = useState<Country[]>([] as Country[]);
    const [subDivisions, setSubDivisions] = useState<SubDivision[]>([] as SubDivision[]);
    const [loading, setLoading] = useState(false);
    const [disableSave, setDisableSave] = useState(true);

    const toggleWorkDay = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const day = event.target.value;

        if (checked) {
            setWorkingDays([...workingDays, day]);
        } else {
            setWorkingDays(workingDays.filter(item => item !== day));
        }
    }

    const getAllCountries = async () => {
        try {
            setLoading(true);
            const countries = await getCountries();
            setCountries(countries);
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    const getAllSubDivisions = async (country: Country) => {
        try {
            const aux = await getSubDivisions(country?.isoCode || '');
            setSubDivisions(aux);

        } catch (error) {
            throw error;
        }
    }

    const localSave = () => save(selectedCountry as Country, selectedSubDivision as SubDivision, workingDays);

    useEffect(() => {
        getAllCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) getAllSubDivisions(selectedCountry);
    }, [selectedCountry]);

    useEffect(() => {
        setDisableSave(!(selectedCountry && selectedSubDivision && workingDays.length > 0));
    }, [selectedCountry, selectedSubDivision, workingDays]);

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Set your preferences</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="country-select">Country</Label>
                            <Input
                                id="country-select"
                                type="select"
                                onChange={(e) => {
                                    const obj = JSON.parse(e.target.value)
                                    setSelectedCountry(obj)
                                }}
                                defaultValue={JSON.stringify(selectedCountry)}
                            >
                                <option value="" />
                                {countries.map((country, index) => (
                                    <option
                                        key={index}
                                        value={JSON.stringify(country)}
                                    >
                                        {country.name} - {country.isoCode}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="sub-division-select">SubDivision</Label>
                            <Input
                                id="sub-division-select"
                                disabled={loading || subDivisions.length === 0}
                                type="select"
                                onChange={(e) => {
                                    const obj = JSON.parse(e.target.value)
                                    setSelectedSubDivision(obj)
                                }}
                                defaultValue={JSON.stringify(selectedSubDivision)}
                            >
                                {subDivisions.map((subDivision, index) => (
                                    <option
                                        key={index}
                                        value={JSON.stringify(subDivision)}
                                    >
                                        {subDivision.name} - {subDivision.isoCode}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Working days</Label>
                            <div className='row m-0'>
                                {WEEK_DAYS.map((day: string, index: number) => (
                                    <FormGroup check inline key={index} className='col-6 d-flex m-0 mt-1'>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                value={day}
                                                onChange={toggleWorkDay}
                                                checked={workingDays.includes(day)}
                                            /> {day}
                                        </Label>
                                    </FormGroup>
                                ))}
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={localSave} disabled={disableSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ConfigModal;