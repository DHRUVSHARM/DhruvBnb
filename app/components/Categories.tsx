'use client';
import Image from "next/image";
import { use } from "react";

const custom = {
    width: 50,
    height: 50,
};

const Categories = () => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div
                onClick={() => { console.log("clicked ...") }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/all_category.png"
                    alt="Category - All"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>All</span>
            </div>

            <div
                onClick={() => { console.log("clicked ...") }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/beach_category.jpeg"
                    alt="Category - Beach"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Beach</span>
            </div>

            <div
                onClick={() => { console.log("clicked ...") }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/villa_category.png"
                    alt="Category - Villas"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Villas</span>
            </div>

            <div
                onClick={() => { console.log("clicked ...") }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
                <Image
                    src="/cabin_category.jpeg"
                    alt="Categoy-Cabins"
                    width={custom.height}
                    height={custom.width}
                />

                <span className='text-xs'>Cabins</span>
            </div>

            <div
                onClick={() => { console.log("clicked ...") }}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
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