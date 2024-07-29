'use client';

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";

//import { format } from 'date-fns';
//import { useEffect, useState } from 'react';
//import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import { title } from "process";
//import apiService from '@/app/services/apiService';
//import useSearchModal from '@/app/hooks/useSearchModal';

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null
}

/*
interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

*/
const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id
}) => {
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
            // we need to return filtered properties , we need a query string in the url
            url += `?landlord_id=${landlord_id}`
        }

        const properties_data = await apiService.get(url)
        setProperties(properties_data.data)
    };

    useEffect(() => {
        getProperties();
    }, [])

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