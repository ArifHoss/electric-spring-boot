import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface OutletProductCardProps {
    title: string;
    description: string;
    category?: string;
    price: number;
    originalPrice: number;
    currency?: string;
    stock?: number;
    image: string;
    reviews: number;
    availability: string;
    to: string;
}

const OutletProductCard = ({
    title,
    description,
    category,
    price,
    originalPrice,
    currency = 'SEK',
    stock,
    image,
    reviews,
    availability,
    to
}: OutletProductCardProps) => {
    return (
        <Link
            to={to}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col gap-2 relative"
        >
            <div className="relative w-full h-40">
                {/* OUTLET badge */}
                <div className="absolute -left-3 -top-3 w-12 h-12 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    OUTLET
                </div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain"
                />
            </div>

            {category && (
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {category}
                </p>
            )}

            <h3 className="text-sm font-semibold">{title}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <FaRegStar key={i} />
                    ))}
                <span className="text-gray-600 text-xs ml-2">
                    ({reviews} omdömen)
                </span>
            </div>

            {/* Price block */}
            <div className="text-sm space-y-1">
                <div>
                    <span className="font-semibold text-gray-500">
                        Ord. pris:{' '}
                    </span>
                    <span className="line-through text-gray-400">
                        {originalPrice} {currency}
                    </span>
                </div>
                <div>
                    <span className="font-semibold text-red-600">
                        Outlet-pris:{' '}
                    </span>
                    <span className="text-lg text-red-600 font-bold">
                        {price} {currency}
                    </span>
                </div>
            </div>

            {/* Description and availability */}
            <p className="text-sm text-green-700 font-medium">{description}</p>
            <p className="text-xs text-gray-600">{availability}</p>

            {typeof stock === 'number' && (
                <p
                    className={`text-xs ${
                        stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {stock > 0 ? `I lager (${stock})` : 'Slut i lager'}
                </p>
            )}
        </Link>
    );
};

export default OutletProductCard;
