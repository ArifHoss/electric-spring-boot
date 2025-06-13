import { Link } from 'react-router-dom';
import ProductCard from '../banner/ProductCard.tsx';
import Footer from '../components/Footer.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Diskmaskiner', to: '/demo', image: '/washing-machine.png' },
    { label: 'Tvättmaskiner', to: '/demo', image: '/washing-machine.png' },
    { label: 'Torktumlare', to: '/demo', image: '/washing-machine.png' },
    { label: 'Kombimaskiner', to: '/demo', image: '/washing-machine.png' },
    { label: 'Köksfläktar', to: '/demo', image: '/washing-machine.png' },
    { label: 'Inbyggnadsugnar', to: '/demo', image: '/washing-machine.png' },
    { label: 'Hällar', to: '/demo', image: '/washing-machine.png' },
    { label: 'Mikrovågsugnar', to: '/demo', image: '/washing-machine.png' },
    {
        label: 'Kökslådor & tillbehör',
        to: '/demo',
        image: '/washing-machine.png'
    },
    { label: 'Tvätt & Städ', to: '/demo', image: '/washing-machine.png' }
];

const KitchenWashing = () => {
    const { products } = useAuth();
    return (
        <section>
            <header className="px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    EPOQ KÖK & TVÄTTSTUGA
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                    Utforska vår samling av vitvaror, köksutrustning och smarta
                    lösningar för tvätt och städ.
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
                        .filter(
                            (product) =>
                                product.category === 'KITCHEN' ||
                                product.category == 'OTHER'
                        )
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

export default KitchenWashing;
