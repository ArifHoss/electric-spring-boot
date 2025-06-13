import { useAuth } from './AuthContext.tsx';
import { updateUser } from '../api/user.ts';
import { useEffect, useState } from 'react';

const Profile = () => {
    const { user, login } = useAuth();

    // User state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [birthDate, setBirthDate] = useState('');

    // Section toggles
    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // Optional: New address fields (example)
    const [address, setAddress] = useState('');

    // Optional: Password fields
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            setCountry(user.country);
            setBirthDate(user.birthDate);
        }
    }, [user]);

    if (!user) return <p>Laddar användardata...</p>;

    const handleUpdateProfile = async () => {
        try {
            const updated = {
                firstName,
                lastName,
                email,
                phone,
                country,
                birthDate
            };
            await updateUser(user.id, updated);
            await login(user.email);
            alert('Profil uppdaterad!');
            setShowUserInfoForm(false);
        } catch (e) {
            console.error('Update error:', e);
            alert('Misslyckades att uppdatera profil.');
        }
    };

    return (
        <section className="space-y-8 max-w-4xl mx-auto pt-6 px-4">
            <h1 className="text-2xl font-bold mb-4">Min profil</h1>
            {/* 1. Profildetaljer */}
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-3">1. Profildetaljer</h2>
                {!showUserInfoForm ? (
                    <>
                        <ul className="mb-2 space-y-1">
                            <li>
                                <strong>Förnamn:</strong> {user.firstName}
                            </li>
                            <li>
                                <strong>Efternamn:</strong> {user.lastName}
                            </li>
                            <li>
                                <strong>E-post:</strong> {user.email}
                            </li>
                            <li>
                                <strong>Telefon:</strong> {user.phone}
                            </li>
                            <li>
                                <strong>Födelsedatum:</strong> {user.birthDate}
                            </li>
                        </ul>
                        <button
                            onClick={() => setShowUserInfoForm(true)}
                            className="text-blue-600 underline"
                        >
                            Uppdatera profildetaljer
                        </button>
                    </>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateProfile();
                        }}
                    >
                        <label>Förnamn</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border w-full p-1 mb-2"
                        />

                        <label>Efternamn</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border w-full p-1 mb-2"
                        />

                        <label>E-post</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border w-full p-1 mb-2"
                        />

                        <label>Telefon</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border w-full p-1 mb-2"
                        />

                        <label>Födelsedatum</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="border w-full p-1 mb-2"
                        />

                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Uppdatera profil
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowUserInfoForm(false)}
                                className="text-red-500"
                            >
                                Avbryt
                            </button>
                        </div>
                    </form>
                )}
            </div>
            {/* 2. Min adress */}
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-3">2. Min adress</h2>
                {!showAddressForm ? (
                    <button
                        onClick={() => setShowAddressForm(true)}
                        className="text-blue-600 underline"
                    >
                        Uppdatera adress
                    </button>
                ) : (
                    <div className="space-y-2">
                        <label>Adress</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border w-full p-1"
                        />
                        <div className="flex gap-2 mt-2">
                            <button className="bg-green-600 text-white px-4 py-1 rounded">
                                Spara
                            </button>
                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="text-red-500"
                            >
                                Avbryt
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Lösenord */}
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-3">3. Lösenord</h2>
                {!showPasswordForm ? (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="text-blue-600 underline"
                    >
                        Uppdatera lösenord
                    </button>
                ) : (
                    <div className="space-y-2">
                        <label>Nytt lösenord</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border w-full p-1"
                        />
                        <label>Bekräfta lösenord</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border w-full p-1"
                        />
                        <div className="flex gap-2 mt-2">
                            <button className="bg-green-600 text-white px-4 py-1 rounded">
                                Spara
                            </button>
                            <button
                                onClick={() => setShowPasswordForm(false)}
                                className="text-red-500"
                            >
                                Avbryt
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Betalkort */}
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-3">4. Betalkort</h2>
                <p>Ingen betalkortsinformation sparad ännu.</p>
            </div>
        </section>
    );
};

export default Profile;
