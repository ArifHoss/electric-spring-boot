import Footer from '../components/Footer.tsx';
import { Link } from 'react-router-dom';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Datorer', to: '/computer', image: '/computer-acc.png' },
    { label: 'Datorkomponenter', to: '/demo', image: '/componet.png' },
    { label: 'Datortillbehör', to: '/demo', image: '/keyboard.png' },
    { label: 'Skärmar & Tillbehör', to: '/demo', image: '/monitor.png' },
    { label: 'Surfplatta', to: '/demo', image: '/ipad.png' },
    { label: 'Tillbehör till Surfplatta', to: '/demo', image: '/ipad-acc.png' },
    { label: 'Skrivare & Kontor', to: '/demo', image: '/printer.png' },
    { label: 'Nätverk', to: '/demo', image: '/router.png' },
    { label: 'Hårddiskar & Lagring', to: '/demo', image: '/hard.png' },
    { label: 'Mjukvara', to: '/demo', image: '/microsoft.png' },
    { label: 'Hemmakontor', to: '/demo', image: '/cybersecurity.png' },
    { label: 'Tjänster-Datorer & Kontor', to: '/demo', image: '/service.png' }
];

const ComputerAndOffice = () => {
    const { products } = useAuth();
    return (
        <section>
            <header className="p-5">
                <h1>Datorer & Kontor</h1>
            </header>

            <section className="px-6 py-12 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">DATORER OCH KONTOR</h2>
                <p className="mb-6">
                    Hos Electric finner du ett omfattande sortiment av datorer
                    och datatillbehör. Bland annat datorkomponenter, skrivare,
                    hårddiskar och programvaror.
                </p>
            </section>
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
                        <p className="text-lg font-semibold">{item.label}</p>
                    </Link>
                ))}
            </section>
            <section className="p-6">
                <h1 className="p-5 font-bold text-2xl">NÅGOT FÖR DIG?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products
                        .filter((product) => product.category === 'LAPTOP')
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

export default ComputerAndOffice;
