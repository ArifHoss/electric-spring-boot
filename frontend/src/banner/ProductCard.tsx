import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    title: string;
    description: string;
    category?: string;
    price: number;
    currency?: string;
    stock?: number;
    image: string;
    reviews: number;
    availability: string;
    to: string;
}

const ProductCard = ({
    title,
    description,
    category,
    price,
    currency = 'SEK',
    stock,
    image,
    reviews,
    availability,
    to
}: ProductCardProps) => {
    return (
        <Link
            to={to}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col gap-2 relative"
        >
            <div className="relative w-full h-40">
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

            <div className="text-sm space-y-1">
                <div>
                    <span className="text-lg text-black font-bold">
                        {price} {currency}
                    </span>
                </div>
            </div>
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

export default ProductCard;
