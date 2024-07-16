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
}

/*
interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

*/
const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([])

    const getProperties = async (url: string) => {
        const properties_data = await apiService.get(url)
        setProperties(properties_data.data)
    };

    useEffect(() => {
        getProperties('/api/properties/');
    }, [])

    return (
        <>
            {
                properties.map((property) => {
                    return (
                        <PropertyListItem
                            key={property.id}
                            property={property}
                        >
                        </PropertyListItem>
                    );
                })
            }
        </>
    )
}

export default PropertyList;