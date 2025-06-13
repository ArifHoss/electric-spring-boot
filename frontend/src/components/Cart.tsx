import { useCart } from './AuthContext.tsx';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        totalPrice
    } = useCart();

    if (cart.length === 0) {
        return (
            <section className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Din kundvagn är tom</h2>
                <Link to="/dator" className="text-blue-600 hover:underline">
                    Gå tillbaka till produkter
                </Link>
            </section>
        );
    }

    return (
        <section className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Din kundvagn</h2>
            <ul className="space-y-4">
                {cart.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border-b pb-4"
                    >
                        <div>
                            <p className="font-medium text-lg">{item.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => decreaseQuantity(item.id)}
                                    disabled={item.quantity === 1}
                                >
                                    -
                                </button>
                                <span className="font-semibold text-lg">
                                    {item.quantity}
                                </span>
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => addToCart(item)}
                                >
                                    +
                                </button>
                                <button
                                    className="text-red-600 text-sm ml-4 hover:underline"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Ta bort
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {item.price} {item.currency} x {item.quantity}
                            </p>
                        </div>
                        <p className="font-semibold text-lg">
                            {item.price * (item.quantity ?? 1)} {item.currency}
                        </p>
                    </li>
                ))}
            </ul>

            <div className="mt-8 text-right space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={clearCart}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Töm kundvagn
                    </button>
                </div>
                <p className="text-xl font-bold mb-4 md:mb-0">
                    Totalt: {totalPrice.toFixed(2)} {cart[0]?.currency}
                </p>

                <div className="flex flex-col md:flex-row gap-3">
                    <Link
                        to="/kassa"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Fortsätt till Kassan
                    </Link>
                    <Link
                        to="/"
                        className="bg-gray-100 text-blue-600 px-6 py-2 rounded border border-blue-600 hover:bg-blue-50 transition text-center"
                    >
                        Fortsätt handla
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Cart;
