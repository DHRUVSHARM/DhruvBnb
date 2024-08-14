'use client';

import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import Modal from "./Modal";

import SelectCountry, { selectCountryValue } from "../forms/SelectCountry";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import { Calendar, DateRange } from "react-date-range";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',

}


const SearchModal = () => {


    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange?.startDate,
            checkOut: dateRange?.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: ''


        }

        console.log("new search query : ", newSearchQuery)

        searchModal.setQuery(newSearchQuery)
        searchModal.close()
    }

    let content = (
        <>
        </>
    )
    const searchModal = useSearchModal();
    const [country, setCountry] = useState<selectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const [numGuests, setNumGuests] = useState<string>('1')
    const [numBedrooms, setNumBedrooms] = useState<string>('0')
    const [numBathrooms, setNumBathrooms] = useState<string>('0')




    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout')
        }
        else if (searchModal.step === 'checkout') {
            searchModal.open('details')
        }

        setDateRange(selection)
    }

    const contentLocation = (
        <>
            <h2
                className="mb-6 text-2xl"
            >
                Where do you want to go ?
            </h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as selectCountryValue)}
            >

            </SelectCountry>

            <div
                className="mt-6 flex flex-row gap-4"
            >
                <CustomButton
                    className="w-1/2"
                    label="check in date ->"
                    onClick={() => searchModal.open('checkin')}
                >

                </CustomButton>
            </div>

        </>
    )

    const contentCheckin = (
        <>
            <h2
                className="mb-6 text-2xl"
            >
                Where do you want to checkin ?
            </h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            >

            </DatePicker>


            <div
                className="mt-6 flex flex-row gap-4"
            >
                <CustomButton
                    className="w-1/2"
                    label="Location"
                    onClick={() => searchModal.open('location')}
                >

                </CustomButton>


                <CustomButton
                    className="w-1/2"
                    label="check out date ->"
                    onClick={() => searchModal.open('checkout')}
                >

                </CustomButton>
            </div>

        </>
    )

    const contentCheckOut = (
        <>
            <h2
                className="mb-6 text-2xl"
            >
                Where do you want to checkout ?
            </h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            >

            </DatePicker>


            <div
                className="mt-6 flex flex-row gap-4"
            >
                <CustomButton
                    className="w-1/2"
                    label="Check in Date"
                    onClick={() => searchModal.open('checkin')}
                >

                </CustomButton>


                <CustomButton
                    className="w-1/2"
                    label="Details ->"
                    onClick={() => searchModal.open('details')}
                >

                </CustomButton>
            </div>

        </>
    )

    const contentDetails = (
        <>
            <h2
                className="mb-6 text-2xl"
            >
                Details
            </h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests : </label>
                    <input
                        type="number" min="1" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                        placeholder="Number of Guests"
                    >


                    </input>
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms : </label>
                    <input
                        type="number" min="1" value={numBedrooms} onChange={(e) => setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                        placeholder="Number of Bedrooms"
                    >


                    </input>
                </div>

                <div className="space-y-4">
                    <label>Number of Bathrooms : </label>
                    <input
                        type="number" min="1" value={numBathrooms} onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                        placeholder="Number of Bathrooms"
                    >


                    </input>
                </div>

            </div>



            <div
                className="mt-6 flex flex-row gap-4"
            >
                <CustomButton
                    className="w-1/2"
                    label="Check out Date"
                    onClick={() => searchModal.open('checkout')}
                >

                </CustomButton>


                <CustomButton
                    className="w-1/2"

                    label="Search"
                    onClick={closeAndSearch}
                >

                </CustomButton>
            </div>

        </>
    )



    if (searchModal.step == 'location') {
        content = contentLocation;
    }
    else if (searchModal.step == 'checkin') {
        content = contentCheckin
    }
    else if (searchModal.step == 'checkout') {
        content = contentCheckOut
    }
    else if (searchModal.step == 'details') {
        content = contentDetails
    }

    return (
        <Modal
            label="Search"
            content={content}
            isOpen={searchModal.isOpen}
            close={searchModal.close}

        >

        </Modal>
    )
}

export default SearchModal;