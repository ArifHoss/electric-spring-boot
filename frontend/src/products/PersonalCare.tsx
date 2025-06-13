import { Link } from 'react-router-dom';
import ProductCard from '../banner/ProductCard.tsx';
import Footer from '../components/Footer.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'Hårfön', to: '/demo', image: '/dryer.png' },
    { label: 'Rakapparat', to: '/demo', image: '/dryer.png' },
    { label: 'Plattång', to: '/demo', image: '/dryer.png' },
    { label: 'Eltandborste', to: '/demo', image: '/dryer.png' },
    { label: 'Massageapparat', to: '/demo', image: '/dryer.png' },
    { label: 'Vågtång', to: '/demo', image: '/dryer.png' },
    { label: 'Skäggtrimmer', to: '/demo', image: '/dryer.png' },
    { label: 'Hårklippare', to: '/demo', image: '/dryer.png' },
    { label: 'IPL hårborttagning', to: '/demo', image: '/dryer.png' },
    { label: 'Vågar & Hälsa', to: '/demo', image: '/dryer.png' }
];

const PersonalCare = () => {
    const { products } = useAuth();
    return (
        <section>
            <header className="px-6 py-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                    PERSONVÅRD, HÄLSA & SKÖNHET
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                    Elgiganten har ett brett sortiment av personvårdsprodukter –
                    från hårstyling och tandborstar till massageapparater och
                    hälsoprodukter.
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

export default PersonalCare;
