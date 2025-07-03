import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import OutletProductCard from '../banner/OutletProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const outletMenuItems = [
    {
        label: 'OUTLET – TV & Hemmabio',
        category: 'tv',
        to: '/demo',
        image: '/camera.png'
    },
    {
        label: 'OUTLET – Datorer & Kontor',
        category: 'computer',
        to: '/demo',
        image: '/ballet.png'
    },
    {
        label: 'OUTLET – Mobiler & Tablets',
        category: 'phone',
        to: '/demo',
        image: '/tv.png'
    },
    {
        label: 'OUTLET – Smartklockor',
        category: 'watch',
        to: '/demo',
        image: '/componet.png'
    },
    {
        label: 'OUTLET – Vitvaror',
        category: 'vitvaror',
        to: '/demo',
        image: '/dryer.png'
    },
    {
        label: 'OUTLET – Gaming',
        category: 'gaming',
        to: '/demo',
        image: '/fridge-7.png'
    },
    {
        label: 'OUTLET – Ljud & Högtalare',
        category: 'sound',
        to: '/demo',
        image: '/game.png'
    },
    {
        label: 'OUTLET – Skönhet & Hälsa',
        category: 'beauty',
        to: '/demo',
        image: '/hard.png'
    },
    {
        label: 'OUTLET – Sport & Fritid',
        category: 'sports',
        to: '/demo',
        image: '/hard.png'
    },
    {
        label: 'OUTLET – Trädgård & Utemiljö',
        category: 'garden',
        to: '/demo',
        image: '/logo.png'
    },
    {
        label: 'OUTLET – Belysning & Smarta Hem',
        category: 'smart-home',
        to: '/demo',
        image: '/money.png'
    },
    {
        label: 'OUTLET – Kaffemaskiner & Kök',
        category: 'kitchen',
        to: '/demo',
        image: '/coffee.png'
    }
];

const OutletProduct = () => {
    const { products } = useAuth();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    // Get outlet products from global products list
    const productList = products
        .filter((p) => p.title?.startsWith('OUTLET'))
        .map((p) => ({
            ...p,
            discount: 0.25,
            originalPrice: Math.round(p.price / (1 - 0.25)),
            image: '/image.png',
            reviews: p.reviews ?? 0,
            availability: p.availability ?? 'Tillgänglighet okänd',
            to: `/product/${p.id}`
        }));

    const filteredProducts = productList
        .filter((p) =>
            selectedCategory ? p.category === selectedCategory : true
        )
        .sort((a, b) => {
            if (sortBy === 'lowestPrice') return a.price - b.price;
            if (sortBy === 'highestPrice') return b.price - a.price;
            if (sortBy === 'nameAsc') return a.title.localeCompare(b.title);
            if (sortBy === 'nameDesc') return b.title.localeCompare(a.title);
            return 0;
        });

    return (
        <section className="max-w-6xl mx-auto px-4 pt-24 space-y-8">
            <article className="p-6 space-y-4">
                <h1 className="text-3xl font-bold">OUTLET</h1>
                <p className="text-gray-700">
                    På Electric Outlet säljer vi produkter till ett rabatterat
                    pris. Produkterna kan vara återköp eller visningsexemplar
                    men kontrollerade med garanti.
                </p>
            </article>

            <section className="flex overflow-x-auto gap-6 py-6 px-6 snap-x snap-mandatory border-b scrollbar-thin">
                {outletMenuItems.map((item, index) => (
                    <Link
                        to={item.to}
                        key={index}
                        className="flex flex-col items-center min-w-[140px] max-w-[160px] snap-start text-center px-2"
                        onClick={() => setSelectedCategory(item.category)} // optional: set filter
                    >
                        <div className="relative w-16 h-16 mb-2">
                            <div
                                className="absolute -left-4 -top-1.5 w-10 h-10 bg-black text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow">
                                OUTLET
                            </div>
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-sm font-medium leading-snug break-words">
                            {item.label}
                        </p>
                    </Link>
                ))}
            </section>

            <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm focus:ring-2"
                    >
                        <option value="">Alla kategorier</option>
                        <option value="tv">TV & Hemmabio</option>
                        <option value="computer">Datorer & Kontor</option>
                        <option value="phone">Mobiler & Tablets</option>
                        <option value="gaming">Gaming</option>
                    </select>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-sm font-medium text-gray-700">
                        Sortera efter
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm focus:ring-2"
                    >
                        <option value="relevance">Mest relevant</option>
                        <option value="lowestPrice">Lägsta pris</option>
                        <option value="highestPrice">Högsta pris</option>
                        <option value="nameAsc">Namn A–Ö</option>
                        <option value="nameDesc">Namn Ö–A</option>
                    </select>
                </div>
            </section>

            <section className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {/*{filteredProducts.map((product, idx) => (*/}
                    {/*    <OutletProductCard key={idx} {...product} />*/}
                    {/*))}*/}
                    {filteredProducts.map((product) => <OutletProductCard key={product.id} title={product.title} description={product.description ?? "Description not available!"}
                                                                          price={product.price} originalPrice={product.originalPrice} image={'./image.png'} reviews={product.reviews ?? 0}
                                                                          availability={product.availability ?? "Unknown"} to={`/product/${product.id}`}/>)}
                </div>
                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        Inga produkter matchar dina filterval.
                    </p>
                )}
            </section>

            <footer>
                <Footer/>
            </footer>
        </section>
    );
};

export default OutletProduct;
