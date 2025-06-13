// pages/ProductDetail.tsx
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext.tsx';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    stock: number;
    image?: string;
    reviews?: number;
    availability?: string;
    extraInfo?: string;
    warranty?: string;
    manufacturer?: string;
    modelNumber?: string;
    releaseDate?: string;
    features?: string[];
}
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart } = useAuth();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/products/${id}`)
            .then((res) => res.data)
            .then(setProduct)
            .catch(console.error);
    }, [id]);

    if (!product) return <p>Loading...</p>;

    function handleAddToCart(product: Product | null) {
        if (product) addToCart(product);
        alert('ADDED TO CART');
    }

    return (
        <section className="p-6">
            <header className="mb-6 text-sm text-gray-600">
                <Link to="/dator" className="hover:underline text-blue-600">
                    Datorer & Kontor
                </Link>{' '}
                {' > '}
                <Link to="/dator" className="hover:underline text-blue-600">
                    Datorer
                </Link>{' '}
                {' > '}
                <span className="text-gray-800 font-semibold">
                    {product.title}
                </span>
            </header>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-lg p-6 shadow">
                {/* Product Image & Availability */}
                <div>
                    <img
                        src={'/image.png'}
                        alt={product.title}
                        className="w-full max-w-md mx-auto object-contain rounded-lg"
                    />
                    <p className="text-sm text-green-600 mt-4">
                        {product.availability}
                    </p>
                    <p className="text-sm text-gray-600">
                        Lagerstatus:{' '}
                        {product.stock > 0
                            ? `I lager (${product.stock})`
                            : 'Slut i lager'}
                    </p>
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">
                            {product.title}
                        </h1>
                        <p className="text-xl font-semibold text-gray-900 mb-4">
                            {product.price} {product.currency}
                        </p>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="text-sm text-gray-500 mb-2">
                            Kategori:{' '}
                            <span className="uppercase font-medium">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                            onClick={() => handleAddToCart(product)}
                        >
                            Lägg till i kundvagn
                        </button>
                        <Link
                            to="/kassa"
                            className="text-blue-600 underline hover:text-blue-800 text-sm self-center"
                        >
                            Gå till kundvagn
                        </Link>
                    </div>
                </div>
            </div>

            {/* Specs section - Optional */}
            <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 rounded shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                    Produktinformation
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                        <strong>Titel:</strong> {product.title}
                    </li>
                    <li>
                        <strong>Kategori:</strong> {product.category}
                    </li>
                    <li>
                        <strong>Pris:</strong> {product.price}{' '}
                        {product.currency}
                    </li>
                    <li>
                        <strong>Recensioner:</strong>{' '}
                        {product.reviews ?? 'Inga recensioner'}
                    </li>
                    <li>
                        <strong>Tillgänglighet:</strong> {product.availability}
                    </li>
                    {product.manufacturer && (
                        <li>
                            <strong>Tillverkare:</strong> {product.manufacturer}
                        </li>
                    )}
                    {product.modelNumber && (
                        <li>
                            <strong>Modellnummer:</strong> {product.modelNumber}
                        </li>
                    )}
                    {product.releaseDate && (
                        <li>
                            <strong>Lanseringsdatum:</strong>{' '}
                            {new Date(product.releaseDate).toLocaleDateString(
                                'sv-SE'
                            )}
                        </li>
                    )}
                    {product.warranty && (
                        <li>
                            <strong>Garanti:</strong> {product.warranty}
                        </li>
                    )}
                    {Array.isArray(product.features) &&
                        product.features.length > 0 && (
                            <div>
                                <strong>Funktioner:</strong>
                                <ul className="list-disc ml-6 mt-1">
                                    {product.features.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                </ul>
                {product.extraInfo && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">
                            Mer information
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            {product.extraInfo}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetail;
