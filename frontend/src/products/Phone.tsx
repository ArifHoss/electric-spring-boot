import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Mobiltelefon', to: '/computercard', image: '/computer-acc.png' },
    { label: 'Surfplatta', to: '/demo', image: '/componet.png' },
    { label: 'Smart ring', to: '/demo', image: '/keyboard.png' },
    { label: 'Smartwatch', to: '/demo', image: '/monitor.png' },
    { label: 'Aktivitetsarmband', to: '/demo', image: '/ipad.png' },
    { label: 'Träningsklocka', to: '/demo', image: '/ipad-acc.png' },
    { label: 'Mobiltillbehör', to: '/demo', image: '/printer.png' },
    { label: 'Tillbehör till Smartwatch', to: '/demo', image: '/router.png' },
    { label: 'Baganade mobiler', to: '/demo', image: '/hard.png' },
    {
        label: 'Tillbehör till Surfplatta',
        to: '/demo',
        image: '/microsoft.png'
    },
    { label: 'Mobilt bredband', to: '/demo', image: '/cybersecurity.png' },
    { label: 'Fast telefoni', to: '/demo', image: '/service.png' }
];

const Phone = () => {
    const { products } = useAuth();

    return (
        <section>
            <header className="px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    Mobiler, Tablets & Smartklockor
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                    Upptäck vårt stora utbud av mobiltelefoner, surfplattor och
                    smartklockor – allt du behöver för ett uppkopplat liv!
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
                        .filter((product) => product.category === 'PHONE')
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

export default Phone;
