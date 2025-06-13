import { useAuth } from './AuthContext.tsx';
import { IoIosHeart } from 'react-icons/io';

type Props = {
    setActiveTab: (tab: string) => void;
};

const MyPage = ({ setActiveTab }: Props) => {
    const { user } = useAuth();

    if (!user) return <p>Laddar användardata...</p>;

    const handleUpdateClick = () => {
        setActiveTab('PROFIL');
    };

    return (
        <section className="max-w-6xl mx-auto pt-6 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Mina Uppgifter */}
                <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">Mina Uppgifter</h2>
                    <p>
                        <strong>Namn:</strong> {user.firstName} {user.lastName}
                    </p>
                    <p>
                        <strong>E-post:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Telefon:</strong> {user.phone}
                    </p>
                    <button
                        onClick={handleUpdateClick}
                        className="text-blue-600 underline mt-2"
                    >
                        Uppdatera information
                    </button>
                </div>

                {/* 2. Land & Födelsedatum */}
                <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">Land</h2>
                    <p>
                        <strong>Land:</strong> {user.country}
                    </p>
                    <p>
                        <strong>Födelsedatum:</strong> {user.birthDate}
                    </p>
                    <button
                        onClick={handleUpdateClick}
                        className="text-blue-600 underline mt-2"
                    >
                        Uppdatera profil
                    </button>
                </div>

                {/* 3. Favoritebutik */}
                <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">Favoritbutik</h2>
                    <p>Ingen butik vald.</p>
                    <button className="text-blue-600 underline mt-2">
                        Välj butik
                    </button>
                </div>

                {/* 4. Kundklubb */}
                <div className="border border-gray-300 rounded-md p-4 shadow-sm">
                    <h2 className="text-lg font-bold mb-3">Kundklubb</h2>
                    <div className="flex items-start gap-2 mb-2">
                        <IoIosHeart className="text-red-500 text-2xl mt-1" />
                        <p className="text-gray-700">
                            Medlemskap i Elgigantens kundklubb ger dig rabatter
                            och erbjudanden.
                        </p>
                    </div>
                    <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-1 rounded">
                        Visa erbjudanden
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MyPage;
