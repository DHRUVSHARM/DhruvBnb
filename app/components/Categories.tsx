'use client';
import Image from "next/image";
import { useState } from "react";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";

const custom = {
    width: 50,
    height: 50,
};

const Categories = () => {

    const searchModal = useSearchModal()
    const [category, setCategory] = useState('')

    const _setCategory = (_category: string) => {
        setCategory(_category);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category
        }

        searchModal.setQuery(query)

    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div
                onClick={() => {
                    console.log("clicked all ...")
                    _setCategory('')
                }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/all_category.png"
                    alt="Category - All"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>All</span>
            </div>

            <div
                onClick={() => {
                    console.log("clicked beach ...")
                    _setCategory('Beach')
                }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Beach' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/beach_category.jpeg"
                    alt="Category - Beach"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Beach</span>
            </div>

            <div
                onClick={() => {
                    console.log("clicked villas ...")
                    _setCategory('Villas')
                }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Villas' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/villa_category.png"
                    alt="Category - Villas"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Villas</span>
            </div>

            <div
                onClick={() => {
                    console.log("clicked cabins ...")
                    _setCategory('Cabins')
                }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Cabins' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/cabin_category.jpeg"
                    alt="Categoy-Cabins"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Cabins</span>
            </div>

            <div
                onClick={() => {
                    console.log("clicked tiny homes ...")
                    _setCategory('Tiny homes')
                }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'Tiny homes' ? 'border-black' : 'border-white'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/another_category.png"
                    alt="Category - Tiny homes"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Tiny homes</span>
            </div>
        </div>
    );
};

export default Categories;