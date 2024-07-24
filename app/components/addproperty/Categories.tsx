import Image from "next/image"
const custom = {
    width: 50,
    height: 50,
};

interface CategoriesProps {
    dataCategory: string,
    setCategory: (category: string) => void

}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory,
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">

                <div
                    onClick={() => setCategory('Beach')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Beach' ? "border-gray-950" : "border=white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                    <Image
                        src="/beach_category.jpeg"
                        alt="Category - Beach"
                        width={custom.height}
                        height={custom.width}
                    />

                    <span className='text-xs'>Beach</span>
                </div>

                <div
                    onClick={() => setCategory('Villas')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Villas' ? "border-gray-950" : "border=white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                    <Image
                        src="/villa_category.png"
                        alt="Category - Villas"
                        width={custom.height}
                        height={custom.width}
                    />

                    <span className='text-xs'>Villas</span>
                </div>

                <div
                    onClick={() => setCategory('Cabins')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Cabins' ? "border-gray-950" : "border=white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                    <Image
                        src="/cabin_category.jpeg"
                        alt="Categoy-Cabins"
                        width={custom.height}
                        height={custom.width}
                    />

                    <span className='text-xs'>Cabins</span>
                </div>

                <div
                    onClick={() => setCategory('Tiny homes')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Tiny homes' ? "border-gray-950" : "border=white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                    <Image
                        src="/another_category.png"
                        alt="Category - Tiny homes"
                        width={custom.height}
                        height={custom.width}
                    />

                    <span className='text-xs'>Tiny homes</span>
                </div>
            </div>
        </>
    )
}

export default Categories;