import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEdgeLegacy } from 'react-icons/fa';

const users = [
    {
        name: 'Arif Hossain',
        email: 'email@gmail.com',
        password: '12345' // Store as string for input comparison
    }
];

const LoginCompany = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        const matchedUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem('userName', matchedUser.name);
            navigate('/'); // Go to homepage or dashboard
        } else {
            setErrorMsg('Fel e-post eller lösenord.');
        }
    };

    return (
        <div className="pt-20 px-4 max-w-md mx-auto space-y-4 ">
            <header className="flex justify-center py-2 gap-20">
                <Link to="/login"> Tillbaka</Link>
                <Link to="/" className="flex">
                    {' '}
                    företag{' '}
                    <FaEdgeLegacy className="text-2xl text-green-700 font-bold" />
                </Link>
            </header>

            <div className="space-y-2">
                <h4 className="flex justify-center font-bold text-xl">
                    Logga in
                </h4>
                <label htmlFor="email" className="block text-sm font-medium">
                    E-post
                </label>
                <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                />

                <label htmlFor="password" className="block text-sm font-medium">
                    Lösenord
                </label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                />

                <Link
                    to="/forget-pass"
                    className="block text-blue-600 text-sm mt-2 flex justify-center"
                >
                    Glömt ditt lösenord?
                </Link>

                {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                <button
                    onClick={handleLogin}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Logga in
                </button>
                <div className="grid justify-items-center">
                    <p>Har ni inget konto? </p>
                    <button className="px-4 py-2 border-2 rounded-full border-green-500 text-green-500 w-full ">
                        Skapa konto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginCompany;
