import { FaComputer, FaKitchenSet, FaTv } from 'react-icons/fa6';
import { GiWashingMachine } from 'react-icons/gi';
import { IoIosPhonePortrait } from 'react-icons/io';
import { IoGameControllerOutline } from 'react-icons/io5';
import { PiHairDryer } from 'react-icons/pi';
import { SiAirtable } from 'react-icons/si';
import { MdOutlet, MdOutlineMedicalServices } from 'react-icons/md';
import { Link } from 'react-router-dom';
import BannerCarousel from '../banner/BannerCarousel.tsx';
import Footer from './Footer.tsx';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from './AuthContext.tsx';

const menuItems = [
    { label: 'Outlet', to: '/outlet', icon: <MdOutlet /> },
    { label: 'Datorer & Kontor', to: '/dator', icon: <FaComputer /> },
    {
        label: 'Mobiler, Tablets & Smartklockor',
        to: '/phone',
        icon: <IoIosPhonePortrait />
    },
    { label: 'TV, Ljud & Smart Hem', to: '/tvsound', icon: <FaTv /> },
    { label: 'Gaming', to: '/gaming', icon: <IoGameControllerOutline /> },
    {
        label: 'Epoq Kök & Tvättstuga',
        to: '/kitchenwashing',
        icon: <FaKitchenSet />
    },
    { label: 'Vitvaror', to: '/vitavaror', icon: <GiWashingMachine /> },
    {
        label: 'Personvård, Hälsa & Skönhet',
        to: '/personalcare',
        icon: <PiHairDryer />
    },
    { label: 'Sport & Fritid', to: '/sport', icon: <SiAirtable /> },
    {
        label: 'Tjänster & Tillbehör',
        to: '/service',
        icon: <MdOutlineMedicalServices />
    }
];

const Home = () => {
    const { products } = useAuth();

    return (
        <section>
            {/* Horizontal Menu */}
            <header className="flex overflow-x-auto gap-6 py-6 px-6 snap-x snap-mandatory border-b scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-600">
                {menuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center min-w-[120px] max-w-[160px] snap-start text-center px-2"
                    >
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <p className="text-sm font-medium leading-snug break-words">
                            {item.label.toUpperCase()}
                        </p>
                    </Link>
                ))}
            </header>
            {/* Promotional banner carousel */}
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-0">
                <BannerCarousel />
            </section>

            <section className="p-6">
                <h1 className="text-2xl font-bold">NÅGOT FÖR DIG?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={'/image.png'}
                            title={product.title}
                            reviews={product.reviews ?? 0}
                            description={product.description ?? "Description not available!"}
                            availability={
                                product.availability ?? 'Tillgänglighet okänd'
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

export default Home;
