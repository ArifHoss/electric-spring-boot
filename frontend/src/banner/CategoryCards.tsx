import { Link } from 'react-router-dom';
import { MdOutlet, MdOutlineMedicalServices } from 'react-icons/md';
import { FaComputer, FaKitchenSet, FaTv } from 'react-icons/fa6';
import { IoIosPhonePortrait } from 'react-icons/io';
import { IoGameControllerOutline } from 'react-icons/io5';
import { GiWashingMachine } from 'react-icons/gi';
import { PiHairDryer } from 'react-icons/pi';
import { SiAirtable } from 'react-icons/si';

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
    },
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
const CategoryCards = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-6">
            {menuItems.map((item, idx) => (
                <Link
                    to={item.to}
                    key={idx}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-md bg-white hover:bg-gray-100 transition text-center"
                >
                    <div className="text-5xl">{item.icon}</div>
                    <p className="text-lg font-semibold">{item.label}</p>
                </Link>
            ))}
        </section>
    );
};

export default CategoryCards;
