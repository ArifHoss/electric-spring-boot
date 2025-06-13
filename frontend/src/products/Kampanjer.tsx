import ProductCard from '../banner/ProductCard.tsx';
import { useAuth } from '../components/AuthContext.tsx';

const Kampanjer = () => {
    const { products } = useAuth();
    return (
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
                            description={product.description}
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

export default Kampanjer;
