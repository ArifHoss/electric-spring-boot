import { Link } from 'react-router-dom';
import ProductCard from '../banner/ProductCard.tsx';
import Footer from '../components/Footer.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Kylskåp', to: '/demo', image: '/fridge.png' },
    { label: 'Frysar', to: '/demo', image: '/fridge.png' },
    { label: 'Kyl/frys-kombiskåp', to: '/demo', image: '/fridge.png' },
    { label: 'Side-by-side kyl', to: '/demo', image: '/fridge.png' },
    { label: 'Vinkyl', to: '/demo', image: '/fridge.png' },
    { label: 'Tvättmaskin', to: '/demo', image: '/fridge.png' },
    { label: 'Torktumlare', to: '/demo', image: '/fridge.png' },
    { label: 'Diskmaskin', to: '/demo', image: '/fridge.png' },
    { label: 'Mikrovågsugn', to: '/demo', image: '/fridge.png' },
    { label: 'Spis & Ugn', to: '/demo', image: '/fridge.png' },
    { label: 'Fläktar', to: '/demo', image: '/fridge.png' },
    { label: 'Tillbehör vitvaror', to: '/demo', image: '/fridge.png' }
];

const Vitavaror = () => {
    const { products } = useAuth();

    return (
        <section>
            <header className="px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    VITVAROR
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                    Hitta vitvarorna som passar ditt hem och din livsstil. Vi
                    erbjuder kylskåp, tvättmaskiner, diskmaskiner och mycket mer
                    – alltid till bra pris.
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
                        .filter((product) => product.category === 'HOME')
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

export default Vitavaror;
