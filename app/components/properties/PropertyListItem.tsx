import Image from "next/image";
import { useRouter } from "next/navigation";

const property = {
    image_url: '/all_category.png',
    title: 'Property Title',
    price_per_night: 'Property Price',
};

const PropertyListItem = () => {

    return (
        <div
            className="cursor-pointer"
            onClick={() => { console.log("clicked ...") }}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />

            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
            </div>
        </div>

    )
}

export default PropertyListItem;