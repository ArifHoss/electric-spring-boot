import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const legoMenuItems = [
    { label: 'LEGO City', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Technic', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Friends', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Ninjago', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Creator', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Duplo', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Star Wars', to: '/demo', image: '/lego.png' },
    { label: 'LEGO Marvel', to: '/demo', image: '/lego.png' }
];

const LEGO = () => {
    const { products } = useAuth();

    return (
        <section>
            <header className="px-6 py-10 text-center bg-yellow-100">
                <h1 className="text-4xl font-extrabold text-yellow-900 mb-3">
                    LEGO
                </h1>
                <p className="text-yellow-800 text-lg max-w-2xl mx-auto">
                    Utforska vårt färgglada sortiment av LEGO-set för alla
                    åldrar. Låt kreativiteten flöda!
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
                {legoMenuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center gap-3 p-5 bg-white shadow rounded-xl hover:bg-gray-50 transition text-center"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products
                        .filter((product) => product.category === 'OTHER')
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

export default LEGO;
