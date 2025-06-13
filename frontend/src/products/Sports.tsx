import { Link } from 'react-router-dom';
import ProductCard from '../banner/ProductCard.tsx';
import Footer from '../components/Footer.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Löpband', to: '/demo', image: '/camera-1.png' },
    { label: 'Crosstrainer', to: '/demo', image: '/camera-1.png' },
    { label: 'Träningscykel', to: '/demo', image: '/camera-1.png' },
    { label: 'Vikter & Hantlar', to: '/demo', image: '/camera-1.png' },
    { label: 'Yogamattor', to: '/demo', image: '/camera-1.png' },
    { label: 'Sportklockor', to: '/demo', image: '/camera-1.png' },
    { label: 'Actionkameror', to: '/demo', image: '/camera-1.png' },
    { label: 'El-scooter', to: '/demo', image: '/camera-1.png' },
    { label: 'Hörlurar för träning', to: '/demo', image: '/camera-1.png' },
    { label: 'Vätskeryggsäckar', to: '/demo', image: '/camera-1.png' }
];

const Sports = () => {
    const { products } = useAuth();

    return (
        <section>
            <header className="px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    SPORT & FRITID
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                    Allt för en aktiv livsstil – träning, teknik och tillbehör.
                    Upptäck vårt sortiment för sport och fritid.
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-6">
                {menuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition text-center"
                    >
                        <img
                            src={item.image}
                            alt={item.label}
                            className="w-16 h-16 object-contain"
                        />
                        <p className="text-lg font-semibold">
                            {item.label.toUpperCase()}
                        </p>
                    </Link>
                ))}
            </section>

            <section className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products
                        .filter((product) => product.category === 'GAME') // CATEGORY NEED TO MATCH EXACTLY
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                image={'/image.png'}
                                title={product.title}
                                reviews={product.reviews ?? 0}
                                description={product.description}
                                availability={
                                    product.availability ??
                                    'Tillgänglighet okänd'
                                }
                                price={product.price}
                                currency={product.currency}
                                category={product.category}
                                stock={product.stock}
                                to={`/product/${product.id}`}
                            />
                        ))}
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </section>
    );
};

export default Sports;
