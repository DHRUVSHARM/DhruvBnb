'use client';

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
//import { format } from 'date-fns';
//import { useEffect, useState } from 'react';
//import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import { title } from "process";
//import apiService from '@/app/services/apiService';
//import useSearchModal from '@/app/hooks/useSearchModal';

import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";


export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

/*
interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

*/
const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}) => {

    const searchModal = useSearchModal()
    const params = useSearchParams()
    const country = searchModal.query.country
    const numGuests = searchModal.query.guests
    const numBathrooms = searchModal.query.bathrooms
    const numBedrooms = searchModal.query.bedrooms
    const checkinDate = searchModal.query.checkIn
    const checkoutDate = searchModal.query.checkOut
    const category = searchModal.query.category

    const [properties, setProperties] = useState<PropertyType[]>([])

    const markFavorite = (id: string, is_favorite: boolean) => {
        // function to mark favorite
        const tempProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favorite = is_favorite

                if (is_favorite) {
                    console.log("added to list of favorited properties ..")
                }
                else {
                    console.log("removed from favorite ..")
                }
            }

            return property

        })

        setProperties(tempProperties)
    }

    const getProperties = async () => {
        let url = '/api/properties/'

        if (landlord_id) {
            // we need to return filtered properties based on landlord , we need a query string in the url
            url += `?landlord_id=${landlord_id}`
        }
        else if (favorites) {
            // we need to return the favorite properties , since that is the prop passed
            url += '?is_favorites=true'
        } else {
            let urlQuery = '';

            if (country) {
                urlQuery += '&country=' + country
            }

            if (numGuests) {
                urlQuery += '&numGuests=' + numGuests
            }

            if (numBedrooms) {
                urlQuery += '&numBedrooms=' + numBedrooms
            }

            if (numBathrooms) {
                urlQuery += '&numBathrooms=' + numBathrooms
            }

            if (category) {
                console.log("the category is : ", category)
                urlQuery += '&category=' + category
            }

            if (checkinDate) {
                urlQuery += '&checkin=' + format(checkinDate, 'yyyy-MM-dd')
            }


            if (checkoutDate) {
                urlQuery += '&checkout=' + format(checkoutDate, 'yyyy-MM-dd')
            }

            if (urlQuery.length) {
                console.log("Query : ", urlQuery)
                urlQuery = '?' + urlQuery.substring(1)

                url += urlQuery
            }

        }

        const properties_data = await apiService.get(url)
        // now we will set the properties with the is favorite

        const tempProperties = properties_data.data.map((property: PropertyType) => {
            if (properties_data.favourites.includes(property.id)) {
                property.is_favorite = true;
            }
            else {
                property.is_favorite = false;
            }

            return property
        })

        setProperties(tempProperties)
    };

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params])

    return (
        <>
            {
                properties.map((property) => {
                    return (
                        <PropertyListItem
                            key={property.id}
                            property={property}
                            markFavorite={(is_favorite: any) => { markFavorite(property.id, is_favorite) }}
                        >
                        </PropertyListItem>
                    );
                })
            }
        </>
    )
}

export default PropertyList;