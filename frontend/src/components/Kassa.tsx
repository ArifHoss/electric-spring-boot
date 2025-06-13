import { useState, useRef, useEffect } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import { useAuth, useCart } from './AuthContext.tsx';
import Cart from './Cart.tsx';
import { useNavigate } from 'react-router-dom';

const Kassa = () => {
    const { user } = useAuth();
    const { cart, totalItems, clearCart, totalPrice } = useCart();

    const [showCart, setShowCart] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPrivate, setIsPrivate] = useState(true);
    const [orderComplete, setOrderComplete] = useState(false);
    const navigate = useNavigate();

    const currency = cart[0]?.currency ?? 'SEK';

    const handleCompleteOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderComplete(true);
    };

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cartRef.current &&
                !cartRef.current.contains(event.target as Node) &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowCart(false);
            }
        };

        if (showCart) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCart]);

    useEffect(() => {
        if (orderComplete) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [orderComplete]);

    return (
        <section className="relative min-h-screen bg-gray-50 pt-6 md:pt-8">
            {/* Page Header */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <header className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Orderöversikt ({totalItems} produkter)
                    </h1>
                    <button
                        onClick={() => setShowCart((prev) => !prev)}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition"
                    >
                        {showCart ? (
                            <>
                                <FaChevronCircleUp className="mr-1 text-xl" />
                                <span className="text-sm">Dölj varukorg</span>
                            </>
                        ) : (
                            <>
                                <FaChevronCircleDown className="mr-1 text-xl" />
                                <span className="text-sm">Visa varukorg</span>
                            </>
                        )}
                    </button>
                </header>
            </div>

            {/* Inline Cart "slide-down" panel under header */}
            <div className="max-w-6xl mx-auto px-4 mb-6 relative">
                <div
                    ref={cartRef}
                    className={`transition-all duration-300 ease-in-out transform ${
                        showCart
                            ? 'max-h-[1000px] opacity-100 scale-100'
                            : 'max-h-0 opacity-0 scale-y-95'
                    } overflow-hidden bg-white shadow-lg rounded-md`}
                >
                    <div className="p-6">
                        <Cart />
                    </div>
                </div>
            </div>

            {/* Checkout Section with shadow effect */}
            <div
                ref={containerRef}
                className={`transition-opacity duration-300 ${
                    showCart ? 'opacity-40 pointer-events-none' : 'opacity-100'
                }`}
            >
                <section className="bg-white rounded-md shadow p-6 mx-4 md:mx-auto max-w-4xl">
                    {/* Tab switch */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setIsPrivate(true)}
                            className={`px-4 py-2 rounded ${
                                isPrivate
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            Privatkund
                        </button>
                        <button
                            onClick={() => setIsPrivate(false)}
                            className={`px-4 py-2 rounded ${
                                !isPrivate
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            Företagskund
                        </button>
                    </div>

                    {/* User info */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Dina uppgifter
                        </h2>
                        <p>
                            <strong>Namn:</strong> {user?.firstName}{' '}
                            {user?.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                    </div>

                    {/* Delivery options */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Leverans</h2>
                        <label className="flex items-center gap-2">
                            <input type="radio" className="accent-blue-600" />
                            GRATIS - Boka & Hämta i butik, redo inom 1 dag
                        </label>
                    </div>

                    {/* Payment options */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Betalning
                        </h2>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                className="accent-blue-600"
                                defaultChecked
                            />
                            Klarna - Få först. Betala sen
                        </label>
                    </div>

                    {/* Complete Order */}
                    <button
                        onClick={handleCompleteOrder}
                        className="w-full bg-green-600 text-white py-3 rounded text-lg font-semibold hover:bg-green-700 transition"
                    >
                        Slutför order på {totalPrice.toFixed(2)} {currency}
                    </button>
                </section>
            </div>

            {orderComplete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Tack så mycket för din beställning!
                        </h2>
                        <p className="mb-4">
                            Ditt kvitto skickas till{' '}
                            <strong>{user?.email}</strong>
                        </p>
                        <p className="text-lg font-semibold">
                            Total: {totalPrice.toFixed(2)} {currency}
                        </p>
                        <button
                            onClick={() => {
                                clearCart();
                                setOrderComplete(false);
                                navigate('/');
                            }}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Tillbaka
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Kassa;
