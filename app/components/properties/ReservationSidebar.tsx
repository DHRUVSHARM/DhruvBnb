'use client';

import { useState, useEffect } from "react";
import { Calendar, Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import DatePicker from "../forms/Calendar";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',

}

export type Property = {
    id: string;
    price_per_night: number;
    guests: number;

}

interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {

    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0)
    const [nights, setNights] = useState<number>(1)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [minDate, setMinDate] = useState<Date>(new Date())
    const [guests, setGuests] = useState<string>('1')
    const [bookedDates, setBookedDates] = useState<Date[]>([]);

    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        if (userId) {

            console.log("performing user booking with id : ", userId)

            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData()
                formData.append('guests', guests)
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'))
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'))
                formData.append('number_of_nights', nights.toString())
                formData.append('total_price', totalPrice.toString())

                const response = await apiService.post(`/api/properties/${property.id}/book`, formData)

                if (response.success) {
                    console.log("booking placed from backend ....")
                }
                else {
                    console.log("booking went wrong ...")
                }

            }


        }
        else {
            loginModal.open();
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)

        if (newEndDate <= newStartDate) {
            console.log("correcting dates ..")
            newEndDate.setDate(newStartDate.getDate() + 1)

        }

        console.log("new : ", newStartDate, " , ", newEndDate)

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate,

        })
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)
        // we use the reservations from the backend to block the dates on the calendar available to users to book
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date),
            })

            //extend the dates to add the booked days
            dates = [...dates, ...range]
        });

        setBookedDates(dates)
    }

    useEffect(() => {
        getReservations();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && property.price_per_night) {
                const calculated_fee = (dayCount * property.price_per_night) * 0.05
                setFee(calculated_fee)
                setTotalPrice((dayCount * property.price_per_night) + calculated_fee)
                setNights(dayCount)
            }
            else {
                // default calculation is wrt 1
                const calculated_fee = (property.price_per_night) * 0.05
                setFee(calculated_fee)
                setTotalPrice(property.price_per_night + calculated_fee)
                setNights(1)
            }
        }
    }, [dateRange])

    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">

            <h2 className="mb-5 text-2xl ">${property.price_per_night} per night</h2>

            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            >

            </DatePicker>

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guests</label>


                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full -ml-1 text-xm"
                >
                    {
                        guestsRange.map((number) => {
                            return (
                                <option
                                    key={number}
                                    value={number}
                                >
                                    {number}
                                </option>
                            )
                        })
                    }


                </select>


            </div>

            <div
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">
                Book
            </div>

            <div className="mb-4 flex justify-between align-center ">
                <p>
                    ${property.price_per_night} * {nights} nights
                </p>
                <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center ">
                <p>
                    DhruvBnb fee
                </p>
                <p>${fee}</p>
            </div>

            <hr />

            <div className="mb-4 flex justify-between align-center font-bold ">
                <p>
                    Total
                </p>
                <p>${totalPrice}</p>
            </div>

        </aside>
    );
};

export default ReservationSidebar;


