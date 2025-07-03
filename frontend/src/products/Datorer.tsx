import { MdOutlet, MdOutlineMedicalServices } from 'react-icons/md';
import { FaComputer, FaKitchenSet, FaTv } from 'react-icons/fa6';
import { IoIosPhonePortrait } from 'react-icons/io';
import { IoGameControllerOutline } from 'react-icons/io5';
import { GiWashingMachine } from 'react-icons/gi';
import { PiHairDryer } from 'react-icons/pi';
import { SiAirtable } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const menuItems = [
    { label: 'LAPTOP', to: '/demo', icon: <MdOutlet /> },
    { label: 'JOBBDATOR', to: '/demo', icon: <FaComputer /> },
    { label: 'MACBOOK', to: '/demo', icon: <IoIosPhonePortrait /> },
    { label: 'COPILOT + PC', to: '/demo', icon: <FaTv /> },
    { label: 'CROMEBOOK', to: '/demo', icon: <IoGameControllerOutline /> },
    { label: 'STATIONÄR DATOR', to: '/demo', icon: <FaKitchenSet /> },
    { label: 'GAMING LAPTOP', to: '/vitavaror', icon: <GiWashingMachine /> },
    { label: 'MINI PC', to: '/demo', icon: <PiHairDryer /> },
    { label: 'LÖSNINGAR FÖR KONTORET', to: '/demo', icon: <SiAirtable /> },
    {
        label: 'PC -NYA PRODUKTER',
        to: '/demo',
        icon: <MdOutlineMedicalServices />
    }
];

const Datorer = () => {
    const { products } = useAuth();

    return (
        <section>
            <header>
                <Link to="/dator">Datorer & Kontor</Link>
                {' > '}
                <Link to="/dator">Datorer</Link>
            </header>

            <h2 className="text-3xl font-bold mb-4 p-5">DATORER</h2>
            <section className="flex overflow-x-auto gap-6 py-6 px-6 snap-x snap-mandatory border-b scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-600">
                {menuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center min-w-[120px] max-w-[160px] snap-start text-center px-2"
                    >
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <p className="text-sm font-medium leading-snug break-words">
                            {item.label}
                        </p>
                    </Link>
                ))}
            </section>
            <section className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products
                        .filter((product) => product.category === 'LAPTOP') // CATEGORY NEED TO MATCH EXACTLY
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

export default Datorer;
