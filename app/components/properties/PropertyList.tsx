'use client';

//import { format } from 'date-fns';
//import { useEffect, useState } from 'react';
//import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
//import apiService from '@/app/services/apiService';
//import useSearchModal from '@/app/hooks/useSearchModal';

/*
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

*/
const PropertyList = () => {

    return (
        <>
            <PropertyListItem></PropertyListItem>
            <PropertyListItem></PropertyListItem>
            <PropertyListItem></PropertyListItem>
            <PropertyListItem></PropertyListItem>
            <PropertyListItem></PropertyListItem>
            <PropertyListItem></PropertyListItem>
        </>
    )
}

export default PropertyList;