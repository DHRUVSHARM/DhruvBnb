'use client';

import { text } from "stream/consumers";
import apiService from "../services/apiService";

interface FavoriteButtonProps {
    id: string;
    is_favorite: boolean;
    markFavorite: (is_favorite: any) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    id,
    is_favorite,
    markFavorite
}) => {

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // to stop clicking multiple times ..
        const response = await apiService.post(`/api/properties/${id}/toggle_favorite/`, {})

        // response from the endpoint will be used to notify parent and hide or show the favorited button
        markFavorite(response.is_favorite)

    }

    return (
        <div
            onClick={toggleFavorite}
            className={` bg-slate-200 absolute top-2 right-2 ${is_favorite ? 'text-red-500' : 'text-white-500'} hover:text-red-500 hover:shadow-lg hover:shadow-red-500/50`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </div>

    )
}

export default FavoriteButton;