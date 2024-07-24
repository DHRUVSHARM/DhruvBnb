'use client';

import Select from 'react-select'
import useCountries from '@/app/hooks/useCountries';
import React from 'react';

export type selectCountryValue = {
    label: string,
    value: string
}

interface selectCountryProps {
    value?: selectCountryValue;
    onChange: (value: selectCountryValue) => void;
}

const SelectCountry: React.FC<selectCountryProps> = ({
    value,
    onChange
}) => {

    const { getAll } = useCountries();

    return (
        <>
            <Select
                isClearable
                placeholder="Anywhere"
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as selectCountryValue)}
            >

            </Select>
        </>
    )
}

export default SelectCountry;
