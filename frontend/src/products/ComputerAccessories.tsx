import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const accessoriesMenuItems = [
    { label: 'Tangentbord', to: '/demo', image: '/keyboard.png' },
    { label: 'Datormöss', to: '/demo', image: '/keyboard.png' },
    { label: 'Skärmar', to: '/demo', image: '/keyboard.png' },
    { label: 'Webbkameror', to: '/demo', image: '/keyboard.png' },
    { label: 'Dockningsstationer', to: '/demo', image: '/keyboard.png' },
    { label: 'Headsets', to: '/demo', image: '/keyboard.png' },
    { label: 'Laptopväskor', to: '/demo', image: '/keyboard.png' },
    { label: 'USB-hubbar', to: '/demo', image: '/keyboard.png' }
];

const ComputerAccessories = () => {
    const { products } = useAuth();
    return (
        <section>
            <header className="px-6 py-10 bg-gray-100 text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    DATOR- & KONTORSTILLBEHÖR
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Allt du behöver för att förbättra din arbetsyta – från
                    tangentbord till skärmar och väskor.
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
                {accessoriesMenuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl shadow hover:bg-gray-50 transition text-center"
                    >
                        <img
                            src={item.image}
                            alt={item.label}
                            className="w-16 h-16 object-contain"
                        />
                        <p className="text-lg font-semibold">{item.label}</p>
                    </Link>
                ))}
            </section>

            <section className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products
                        .filter((product) => product.category === 'ACCESSORY')
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                image={'/image.png'}
                                title={product.title}
                                reviews={product.reviews ?? 0}
                                description={product.description ?? "Description not available!"}
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

export default ComputerAccessories;
