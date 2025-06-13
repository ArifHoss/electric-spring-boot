import { Link, useNavigate } from 'react-router-dom';
import { FaEdgeLegacy } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { loginUser } from '../api/user.ts';
import { useAuth } from './AuthContext.tsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth(); // <-- use context login

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            await login(email); // fetch user and set globally
            navigate('/');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setErrorMsg('Fel e-post eller lösenord.');
                } else {
                    setErrorMsg('Något gick fel. Försök igen senare.');
                }
            } else {
                setErrorMsg('Oväntat fel. Försök igen.');
            }
        }
    };

    return (
        <div className="pt-20 px-4 max-w-md mx-auto space-y-4">
            <Link
                to="/"
                className="text-xl font-bold tracking-wide flex justify-center"
            >
                ELECTRIC
                <FaEdgeLegacy className="text-2xl text-green-700 font-bold" />
            </Link>

            <h4 className="font-semibold flex justify-center">INLOGGNING</h4>

            <div className="flex justify-center">
                <div className="flex gap-2 text-sm font-medium bg-gray-300 p-2 rounded-full max-w-[12rem]">
                    <button className="py-2 px-6 rounded-full bg-white text-black">
                        Privat
                    </button>
                    <button
                        onClick={() => navigate('/foretag')}
                        className="py-1 px-4 rounded-full transition-colors"
                    >
                        Företag
                    </button>
                </div>
            </div>

            <form
                className="space-y-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <label htmlFor="email" className="block text-sm font-medium">
                    E-post
                </label>
                <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                            setEmailError('Ogiltig e-postadress');
                        } else {
                            setEmailError('');
                        }
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                />
                {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                )}

                <label htmlFor="password" className="block text-sm font-medium">
                    Lösenord
                </label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        if (value.length < 8) {
                            setPasswordError(
                                'Lösenordet måste vara minst 8 tecken'
                            );
                        } else {
                            setPasswordError('');
                        }
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                />
                {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                )}

                <Link
                    to="/forget-pass"
                    className="block text-blue-600 text-sm mt-2 flex justify-end"
                >
                    Glömt ditt lösenord?
                </Link>

                {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                <button
                    type="submit"
                    disabled={!email || !password}
                    className={`mt-4 w-full py-2 rounded transition-colors ${
                        email && password
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                >
                    Logga in
                </button>

                <div className="flex justify-center">
                    <p>Har ni inget konto? </p>
                    <Link to="/createAccount" className="underline ml-1">
                        Skapa konto
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;