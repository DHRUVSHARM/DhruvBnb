import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropertyType } from "./PropertyList";
import FavoriteButton from "../FavoriteButton";

interface PropertyListItemProps {
    property: PropertyType
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property, markFavorite }) => {

    const router = useRouter()

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                router.push(`/properties/${property.id}/`)
            }}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />

                {
                    // if this function is defined , then we pass it to the child button
                    markFavorite && (
                        <FavoriteButton
                            id={property.id}
                            is_favorite={property.is_favorite}
                            markFavorite={(is_favorite) => markFavorite(is_favorite)}
                        >

                        </FavoriteButton>
                    )

                }

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