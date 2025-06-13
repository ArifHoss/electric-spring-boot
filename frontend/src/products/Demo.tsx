import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const Demo = () => {
    const { products } = useAuth();

    return (
        <section className="p-6">
            <header className="space-y-2">
                <h1 className="text-2xl font-bold">Demo-sida</h1>
                <p className="text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 rounded p-3">
                    🔧 Denna sida är under utveckling. Data visas utan
                    kategorisering och innehåller endast testdata.
                </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        image={'/image.png'}
                        title={product.title}
                        reviews={product.reviews ?? 0}
                        description={
                            product.description ??
                            'Ingen beskrivning tillgänglig'
                        }
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
    );
};

export default Demo;
