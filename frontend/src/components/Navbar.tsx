import { useState, useRef, useEffect } from 'react'; // ← add useRef and useEffect
import { Link } from 'react-router-dom';
import { FiMenu, FiUser, FiShoppingCart, FiMapPin } from 'react-icons/fi';
import { FaTimes, FaEdgeLegacy } from 'react-icons/fa';
import { useAuth, useCart } from './AuthContext.tsx';

const menuItems = [
    { label: 'Datorer & Kontor', to: '/dator' },
    { label: 'Mobiler, Tablets & Smartklockor', to: '/phone' },
    { label: 'TV, Ljud & Smart Hem', to: '/tvsound' },
    { label: 'Gaming', to: '/gaming' },
    { label: 'Datorkomponenter', to: '/computeraccessories' },
    { label: 'Epoq Kök & Tvättstuga', to: '/kitchenwashing' },
    { label: 'Vitvaror', to: '/vitavaror' },
    { label: 'Hem, Hushåll & Trädgård', to: '/homegarden' },
    { label: 'Personvård, Hälsa & Skönhet', to: '/personalcare' },
    { label: 'Sport & Fritid', to: '/sport' },
    { label: 'LEGO', to: '/lego' },
    { label: 'Tjänster & Tillbehör', to: '/service' },
    { label: 'Elgiganten Företag', to: '/company' },
    { label: 'Outlet', to: '/outlet' },
    { label: 'Kampanjer', to: '/kampanjer' },
    { label: 'Elgiganten Kundklubb', to: '/kundklubb' },
    { label: 'Jobba hos oss', to: '/career' }
];

const Navbar = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<typeof menuItems>([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const { totalItems } = useCart();

    const initials = user
        ? `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
        : '';

    // 2. Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                setDrawerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDrawerOpen(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const NavIcons = () => (
        <div className="flex items-center justify-around w-full md:w-auto gap-6 text-sm">
            <Link
                to="/location"
                className="flex flex-col items-center hover:text-blue-400"
            >
                <FiMapPin className="text-xl" />
                <span className="hidden md:inline text-xs">Butik</span>
            </Link>
            {user ? (
                <Link
                    to="/minsida"
                    className="flex flex-col items-center hover:text-blue-400 text-sm"
                >
                    <div className="text-xl">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold">
                            {initials}
                        </div>
                    </div>
                    <span className="hidden md:inline text-xs">Min sida</span>
                </Link>
            ) : (
                <Link
                    to="/login"
                    className="flex flex-col items-center hover:text-blue-400"
                >
                    <FiUser className="text-xl" />
                    <span className="hidden md:inline text-xs">Login</span>
                </Link>
            )}

            <div className="relative">
                <Link
                    to="/kassa"
                    className="flex flex-col items-center hover:text-blue-400"
                >
                    <FiShoppingCart className="text-2xl" />
                    <span className="hidden md:inline text-xs mt-1">
                        Kundvagn
                    </span>
                </Link>
                {totalItems > 0 && (
                    <span className="absolute top-2 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {totalItems}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <section>
            <header className="w-full bg-gray-900 text-white fixed top-0 left-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
                    {/* Hamburger: show first on mobile, second on desktop */}
                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Öppna meny"
                            className="flex items-center gap-1 order-1 md:order-2"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <FiMenu className="text-2xl" />
                            <span className="hidden md:inline text-sm">
                                Meny
                            </span>
                        </button>
                        {/* Logo: show second on mobile, first on desktop */}
                        <Link
                            to="/"
                            className="text-xl font-bold tracking-wide flex items-center order-2 md:order-1"
                        >
                            ELECTRIC
                            <FaEdgeLegacy className="text-2xl text-green-700 font-bold ml-1" />
                        </Link>
                    </div>

                    {/* CENTER: Search bar (only on md+) */}
                    <div className="hidden md:flex flex-1 relative">
                        <input
                            type="text"
                            placeholder="Sök produkter..."
                            value={searchText}
                            onKeyDown={(e) => {
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    setHighlightIndex(
                                        (prev) =>
                                            (prev + 1) % suggestions.length
                                    );
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    setHighlightIndex(
                                        (prev) =>
                                            (prev - 1 + suggestions.length) %
                                            suggestions.length
                                    );
                                } else if (e.key === 'Enter') {
                                    const selected =
                                        suggestions[highlightIndex] ||
                                        suggestions[0];
                                    if (selected) {
                                        setSearchText('');
                                        setSuggestions([]);
                                        setHighlightIndex(-1);
                                        if (selected.to)
                                            window.location.href = selected.to;
                                    }
                                }
                            }}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchText(value);
                                setSuggestions(
                                    menuItems.filter((item) =>
                                        item.label
                                            .toLowerCase()
                                            .includes(value.toLowerCase())
                                    )
                                );
                            }}
                            className="w-full px-4 py-2 pl-10 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {searchText && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white text-black shadow-md rounded-md z-50 mt-1">
                                {suggestions.map(({ label, to }, idx) => (
                                    <Link
                                        key={idx}
                                        to={to || '#'}
                                        onClick={() => {
                                            setSearchText('');
                                            setSuggestions([]);
                                            setHighlightIndex(-1);
                                        }}
                                        className={`block px-4 py-2 ${
                                            idx === highlightIndex
                                                ? 'bg-blue-100 font-semibold'
                                                : 'hover:bg-blue-50'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            width="20"
                            height="20"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                            />
                        </svg>
                    </div>

                    {/* RIGHT: Icons - mobile (no text), desktop (with text) */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link to="/location">
                            <FiMapPin className="text-xl hover:text-blue-400" />
                        </Link>
                        {user ? (
                            <Link to="/minsida">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                    {initials}
                                </div>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <FiUser className="text-xl hover:text-blue-400" />
                            </Link>
                        )}
                        <div className="relative">
                            <Link to="/kassa">
                                <FiShoppingCart className="text-xl hover:text-blue-400" />
                            </Link>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* DESKTOP: icons with text */}
                    <div className="hidden md:flex justify-end">
                        <NavIcons />
                    </div>
                </div>

                {/* Drawer remains unchanged */}
                {drawerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
                        <div
                            ref={drawerRef}
                            className="w-1/2 max-w-sm bg-gray-800 h-full overflow-y-auto px-6 py-6 space-y-4 transform transition-transform duration-300 ease-in-out translate-x-0"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">
                                    Meny
                                </span>
                                <button
                                    aria-label="Stäng meny"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>

                            {menuItems.map(({ label, to }, idx) => (
                                <Link
                                    key={idx}
                                    to={to}
                                    onClick={() => setDrawerOpen(false)}
                                    className="block py-2 text-white text-base hover:text-blue-400"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>
            {/* MOBILE SEARCH INPUT (only on small screens) */}
            <div className="md:hidden px-4 py-2 bg-gray-900 border-t border-gray-700 pt-14 md:pt-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Sök produkter..."
                        value={searchText}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchText(value);
                            setSuggestions(
                                menuItems.filter((item) =>
                                    item.label
                                        .toLowerCase()
                                        .includes(value.toLowerCase())
                                )
                            );
                        }}
                        className="w-full px-4 py-2 pl-10 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchText && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white text-black shadow-md rounded-md z-50 mt-1">
                            {suggestions.map(({ label, to }, idx) => (
                                <Link
                                    key={idx}
                                    to={to || '#'}
                                    onClick={() => setSearchText('')}
                                    className="block px-4 py-2 hover:bg-blue-100"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    )}
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="20"
                        height="20"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
