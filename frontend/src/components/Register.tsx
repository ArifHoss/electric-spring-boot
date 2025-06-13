import { FaEdgeLegacy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');

    const isValidEmail = email.match(/^[^@]+@[^@]+\.[^@]+$/);

    const handleCreateNewUser = () => {
        alert('created');
    };

    return (
        <div className="pt-20 px-4 max-w-md mx-auto space-y-4 ">
            <Link
                to="/"
                className="text-xl font-bold tracking-wide flex justify-center"
            >
                ELECTRIC
                <FaEdgeLegacy className="text-2xl text-green-700 font-bold" />
            </Link>
            <div className="text-center">
                <p>Skapa användare</p>
                <p>Vilken e-postadress vill du registrera dig</p>
                <p>med?</p>
            </div>

            <div>
                <label htmlFor="email">E-post</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                />
                <button
                    onClick={handleCreateNewUser}
                    disabled={!isValidEmail}
                    className={`mt-4 w-full py-2 rounded-full transition-colors ${
                        email
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                >
                    Skicka verifieringskod
                </button>
            </div>
        </div>
    );
};

export default Register;
