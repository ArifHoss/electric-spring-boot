import {FaEdgeLegacy} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowUpRight} from 'react-icons/fi';
import {BsQuestionCircleFill} from 'react-icons/bs';
import {type FormEvent, useState} from 'react';
import axios from 'axios';
import {useAuth} from './AuthContext'; // adjust path as needed

type NewUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
    role: 'USER' | 'ADMIN';
    address: {
        street: string;
        postCode: string;
        city: string;
        country: string;
    };
};

const CreateAccount = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_Password] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [country, setCountry] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER'); // default to USER

    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const countries = [
        'Afghanistan',
        'Albanien',
        'Algeriet',
        'Andorra',
        'Angola',
        'Antigua och Barbuda',
        'Argentina',
        'Armenien',
        'Australien',
        'Österrike',
        'Azerbajdzjan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Vitryssland',
        'Belgien',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnien och Hercegovina',
        'Botswana',
        'Brasilien',
        'Brunei',
        'Bulgarien',
        'Burkina Faso',
        'Burundi',
        'Kambodja',
        'Kamerun',
        'Kanada',
        'Kap Verde',
        'Centralafrikanska republiken',
        'Tchad',
        'Chile',
        'Kina',
        'Colombia',
        'Komorerna',
        'Kongo-Kinshasa',
        'Kongo-Brazzaville',
        'Costa Rica',
        'Kroatien',
        'Kuba',
        'Cypern',
        'Tjeckien',
        'Danmark',
        'Djibouti',
        'Dominica',
        'Dominikanska republiken',
        'Östtimor',
        'Ecuador',
        'Egypten',
        'El Salvador',
        'Ekvatorialguinea',
        'Eritrea',
        'Estland',
        'Eswatini',
        'Etiopien',
        'Fiji',
        'Finland',
        'Frankrike',
        'Gabon',
        'Gambia',
        'Georgien',
        'Tyskland',
        'Ghana',
        'Grekland',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Ungern',
        'Island',
        'Indien',
        'Indonesien',
        'Iran',
        'Irak',
        'Irland',
        'Israel',
        'Italien',
        'Jamaica',
        'Japan',
        'Jordanien',
        'Kazakstan',
        'Kenya',
        'Kiribati',
        'Nordkorea',
        'Sydkorea',
        'Kosovo',
        'Kuwait',
        'Kirgizistan',
        'Laos',
        'Lettland',
        'Libanon',
        'Lesotho',
        'Liberia',
        'Libyen',
        'Liechtenstein',
        'Litauen',
        'Luxemburg',
        'Madagaskar',
        'Malawi',
        'Malaysia',
        'Maldiverna',
        'Mali',
        'Malta',
        'Marshallöarna',
        'Mauretanien',
        'Mauritius',
        'Mexiko',
        'Mikronesiens federerade stater',
        'Moldavien',
        'Monaco',
        'Mongoliet',
        'Montenegro',
        'Marocko',
        'Moçambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Nederländerna',
        'Nya Zeeland',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Nordmakedonien',
        'Norge',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestina',
        'Panama',
        'Papua Nya Guinea',
        'Paraguay',
        'Peru',
        'Filippinerna',
        'Polen',
        'Portugal',
        'Qatar',
        'Rumänien',
        'Ryssland',
        'Rwanda',
        'Saint Kitts och Nevis',
        'Saint Lucia',
        'Saint Vincent och Grenadinerna',
        'Samoa',
        'San Marino',
        'Sao Tomé och Príncipe',
        'Saudiarabien',
        'Senegal',
        'Serbien',
        'Seychellerna',
        'Sierra Leone',
        'Singapore',
        'Slovakien',
        'Slovenien',
        'Salomonöarna',
        'Somalia',
        'Sydafrika',
        'Sydsudan',
        'Spanien',
        'Sri Lanka',
        'Sudan',
        'Surinam',
        'Sverige',
        'Schweiz',
        'Syrien',
        'Tadzjikistan',
        'Tanzania',
        'Thailand',
        'Togo',
        'Tonga',
        'Trinidad och Tobago',
        'Tunisien',
        'Turkiet',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraina',
        'Förenade Arabemiraten',
        'Storbritannien',
        'USA',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatikanstaten',
        'Venezuela',
        'Vietnam',
        'Jemen',
        'Zambia',
        'Zimbabwe'
    ];
    countries.sort((a, b) => a.localeCompare(b, 'sv'));

    const years = Array.from({length: 100}, (_, i) => 2025 - i);

    const months = [
        'Januari',
        'Februari',
        'Mars',
        'April',
        'Maj',
        'Juni',
        'Juli',
        'Augusti',
        'September',
        'Oktober',
        'November',
        'December'
    ];

    const days = Array.from({length: 31}, (_, i) => i + 1);

    const phoneCodes = [
        {name: 'Sverige', code: '+46 (Sverige)'},
        {name: 'Norge', code: '+47 (Norge)'},
        {name: 'Finland', code: '+358 (Finland)'},
        {name: 'Danmark', code: '+45 (Danmark)'},
        {name: 'Island', code: '+354 (Island)'},
        {name: 'USA', code: '+1 (USA)'},
        {name: 'Kanada', code: '+1 (Kanada)'},
        {name: 'Storbritannien', code: '+44 (Storbritannien)'},
        {name: 'Tyskland', code: '+49 (Tyskland)'},
        {name: 'Frankrike', code: '+33 (Frankrike)'},
        {name: 'Spanien', code: '+34 (Spanien)'},
        {name: 'Italien', code: '+39 (Italien)'},
        {name: 'Polen', code: '+48 (Polen)'},
        {name: 'Nederländerna', code: '+31 (Nederländerna)'},
        {name: 'Belgien', code: '+32 (Belgien)'},
        {name: 'Schweiz', code: '+41 (Schweiz)'},
        {name: 'Österrike', code: '+43 (Österrike)'},
        {name: 'Portugal', code: '+351 (Portugal)'},
        {name: 'Grekland', code: '+30 (Grekland)'},
        {name: 'Tjeckien', code: '+420 (Tjeckien)'},
        {name: 'Ungern', code: '+36 (Ungern)'},
        {name: 'Rumänien', code: '+40 (Rumänien)'},
        {name: 'Slovakien', code: '+421 (Slovakien)'},
        {name: 'Slovenien', code: '+386 (Slovenien)'},
        {name: 'Kroatien', code: '+385 (Kroatien)'},
        {name: 'Serbien', code: '+381 (Serbien)'},
        {
            name: 'Bosnien och Hercegovina',
            code: '+387 (Bosnien och Hercegovina)'
        },
        {name: 'Montenegro', code: '+382 (Montenegro)'},
        {name: 'Nordmakedonien', code: '+389 (Nordmakedonien)'},
        {name: 'Turkiet', code: '+90 (Turkiet)'},
        {name: 'Ryssland', code: '+7 (Ryssland)'},
        {name: 'Ukraina', code: '+380 (Ukraina)'},
        {name: 'Belarus', code: '+375 (Vitryssland)'},
        {name: 'Litauen', code: '+370 (Litauen)'},
        {name: 'Lettland', code: '+371 (Lettland)'},
        {name: 'Estland', code: '+372 (Estland)'},
        {name: 'Irland', code: '+353 (Irland)'},
        {name: 'Australien', code: '+61 (Australien)'},
        {name: 'Nya Zeeland', code: '+64 (Nya Zeeland)'},
        {name: 'Japan', code: '+81 (Japan)'},
        {name: 'Sydkorea', code: '+82 (Sydkorea)'},
        {name: 'Kina', code: '+86 (Kina)'},
        {name: 'Indien', code: '+91 (Indien)'},
        {name: 'Pakistan', code: '+92 (Pakistan)'},
        {name: 'Bangladesh', code: '+880 (Bangladesh)'},
        {name: 'Indonesien', code: '+62 (Indonesien)'},
        {name: 'Malaysia', code: '+60 (Malaysia)'},
        {name: 'Thailand', code: '+66 (Thailand)'},
        {name: 'Vietnam', code: '+84 (Vietnam)'},
        {name: 'Filippinerna', code: '+63 (Filippinerna)'},
        {name: 'Singapore', code: '+65 (Singapore)'},
        {name: 'Sydafrika', code: '+27 (Sydafrika)'},
        {name: 'Nigeria', code: '+234 (Nigeria)'},
        {name: 'Egypten', code: '+20 (Egypten)'},
        {name: 'Kenya', code: '+254 (Kenya)'},
        {name: 'Ghana', code: '+233 (Ghana)'},
        {name: 'Tanzania', code: '+255 (Tanzania)'},
        {name: 'Etiopien', code: '+251 (Etiopien)'},
        {name: 'Marocko', code: '+212 (Marocko)'},
        {name: 'Algeriet', code: '+213 (Algeriet)'},
        {name: 'Tunisien', code: '+216 (Tunisien)'},
        {name: 'Senegal', code: '+221 (Senegal)'},
        {name: 'Kamerun', code: '+237 (Kamerun)'},
        {name: 'Moçambique', code: '+258 (Moçambique)'},
        {name: 'Argentina', code: '+54 (Argentina)'},
        {name: 'Brasilien', code: '+55 (Brasilien)'},
        {name: 'Chile', code: '+56 (Chile)'},
        {name: 'Colombia', code: '+57 (Colombia)'},
        {name: 'Peru', code: '+51 (Peru)'},
        {name: 'Ecuador', code: '+593 (Ecuador)'},
        {name: 'Venezuela', code: '+58 (Venezuela)'},
        {name: 'Uruguay', code: '+598 (Uruguay)'},
        {name: 'Paraguay', code: '+595 (Paraguay)'},
        {name: 'Bolivia', code: '+591 (Bolivia)'},
        {name: 'Mexiko', code: '+52 (Mexiko)'},
        {name: 'Costa Rica', code: '+506 (Costa Rica)'},
        {name: 'Panama', code: '+507 (Panama)'},
        {
            name: 'Dominikanska republiken',
            code: '+1-809 (Dominikanska republiken)'
        },
        {name: 'Jamaica', code: '+1-876 (Jamaica)'},
        {name: 'Haiti', code: '+509 (Haiti)'},
        {name: 'Kuba', code: '+53 (Kuba)'},
        {name: 'Israel', code: '+972 (Israel)'},
        {name: 'Saudiarabien', code: '+966 (Saudiarabien)'},
        {name: 'Förenade Arabemiraten', code: '+971 (Förenade Arabemiraten)'},
        {name: 'Kuwait', code: '+965 (Kuwait)'},
        {name: 'Qatar', code: '+974 (Qatar)'},
        {name: 'Iran', code: '+98 (Iran)'},
        {name: 'Irak', code: '+964 (Irak)'},
        {name: 'Jordanien', code: '+962 (Jordanien)'},
        {name: 'Libanon', code: '+961 (Libanon)'},
        {name: 'Syrien', code: '+963 (Syrien)'},
        {name: 'Afghanistan', code: '+93 (Afghanistan)'},
        {name: 'Nepal', code: '+977 (Nepal)'},
        {name: 'Sri Lanka', code: '+94 (Sri Lanka)'},
        {name: 'Maldiverna', code: '+960 (Maldiverna)'},
        {name: 'Georgien', code: '+995 (Georgien)'},
        {name: 'Armenien', code: '+374 (Armenien)'},
        {name: 'Azerbajdzjan', code: '+994 (Azerbajdzjan)'}
    ];

    const handleButtonClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate all fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirm_password ||
            !phone ||
            !phoneCode ||
            !country ||
            !birthYear ||
            !birthMonth ||
            !birthDay
        ) {
            alert('Alla fält måste fyllas i.');
            return;
        }

        if (password !== confirm_password) {
            alert('Lösenorden matchar inte.');
            return;
        }

        const birthDate = `${birthYear}-${String(
            months.indexOf(birthMonth) + 1
        ).padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

        const fullPhone = `${phoneCode}${phone}`.replace(/\s+/g, ''); // Remove spaces if any

        const newUser: NewUser = {
            firstName,
            lastName,
            email,
            password,
            phone: fullPhone,
            dateOfBirth: birthDate,
            role,
            address: {
                street,
                postCode,
                city,
                country
            }
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/users',
                newUser
            );
            // alert('Användare sparad!')
            console.log('Server response: ', response.data);
            await login(email);
            navigate('/');
            setErrorMsg('');
        } catch (error: any) {
            console.error('Något gick fel vid användare:', error);

            // Check for custom error from backend
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                setErrorMsg(error.response.data.error); // <-- show backend error like "Användare med denna e-post finns redan"
            } else {
                setErrorMsg('Kunde inte spara användare!');
            }
        }

        // Clear fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirm_Password('');
        setPhone('');
        setPhoneCode('');
        setCountry('');
        setBirthYear('');
        setBirthMonth('');
        setBirthDay('');
    };

    return (
        <section>
            <header className="text-center mt-10">
                <h1 className="text-3xl font-bold mb-2">
                    Skapa ditt{' '}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1 text-green-800 hover:underline text-2xl"
                    >
                        ELECTRIC
                        <FaEdgeLegacy className="text-2xl text-green-700"/>
                    </Link>{' '}
                    konto
                </h1>
            </header>
            <main className="mt-6 px-4 max-w-xl mx-auto text-center text-gray-700">
                <p className="mb-4 text-lg">
                    Ett Electric‑konto är det enda du behöver för att få åtkomst
                    till alla tjänster från Electric.
                </p>
                <p className="text-md">
                    Har du redan ett Electric‑konto?{' '}
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-400 font-medium"
                    >
                        Logga in <FiArrowUpRight className="text-lg"/>
                    </Link>
                </p>
                <form onSubmit={handleButtonClick} className="mt-6 space-y-4">
                    <fieldset className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                placeholder="John"
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border rounded px-3 py-2"
                                required
                                autoComplete="given-name"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                placeholder="Doe"
                                onChange={(e) => setLastName(e.target.value)}
                                className="border rounded px-3 py-2"
                                required
                                autoComplete="family-name"
                            />
                        </div>
                    </fieldset>

                    <div className="flex flex-col">
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border rounded px-3 py-2 text-gray-900 bg-white"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled className="text-gray-400">
                                Land/område
                            </option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div></div>
                        <div className="relative w-fit group mb-2">
                            <label
                                htmlFor="birthday"
                                className="inline-flex items-center gap-1"
                            >
                                Födelsedatum
                                <BsQuestionCircleFill className="text-gray-500 cursor-pointer"/>
                            </label>
                            <div
                                className="absolute -top-10 left-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                                Ange ditt födelsedatum. Du måste vara minst 16
                                år!
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <select
                                name="year"
                                id="year"
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                className="border rounded px-3 py-2 text-gray-900 bg-white"
                            >
                                <option value="" disabled>
                                    År
                                </option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="month"
                                id="month"
                                value={birthMonth}
                                onChange={(e) => setBirthMonth(e.target.value)}
                                className="border rounded px-3 py-2 text-gray-900 bg-white"
                            >
                                <option value="" disabled>
                                    Månad
                                </option>
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="day"
                                id="day"
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
                                className="border rounded px-3 py-2 text-gray-900 bg-white"
                            >
                                <option value="" disabled>
                                    Dag
                                </option>
                                {days.map((day) => (
                                    <option key={day} value={String(day)}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr className="my-6 border-t border-gray-300"/>

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />

                        {/*lösenord 8 eller fler tecken*/}
                        <input
                            type="password"
                            placeholder="Lösenord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />
                        <input
                            type="password"
                            placeholder="Bekräfta lösenordet"
                            value={confirm_password}
                            onChange={(e) =>
                                setConfirm_Password(e.target.value)
                            }
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />
                    </div>

                    <hr className="my-6 border-t border-gray-300"/>

                    <div className="flex gap-2">
                        <select
                            name="phoneCode"
                            id="phoneCode"
                            value={phoneCode}
                            onChange={(e) => setPhoneCode(e.target.value)}
                            className="w-1/3 px-3 py-2 rounded border border-gray-300"
                            required
                        >
                            <option value="" disabled>
                                Välj landskod
                            </option>
                            {phoneCodes.map(({name, code}) => (
                                <option
                                    key={code}
                                    value={code.match(/^\+\d+/)?.[0] || ''}
                                >
                                    {name} {code.match(/^\+\d+/)?.[0]}
                                </option>
                            ))}
                        </select>
                        <div className="relative w-full group">
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                placeholder="Telefonnummer"
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 pr-10 rounded border border-gray-300"
                                required
                            />

                            <div className="absolute inset-y-0 right-2 flex items-center">
                                <BsQuestionCircleFill className="text-gray-500 cursor-pointer"/>
                            </div>
                            <div
                                className="absolute -top-10 right-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
                                Ange ditt mobilnummer utan landskod
                            </div>
                        </div>
                    </div>

                    <div>
                        {errorMsg && (
                            <p className="text-red-600 font-medium">
                                {errorMsg}
                            </p>
                        )}

                        <input
                            type="text"
                            placeholder="Gatuadress"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="Postnummer"
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />
                        <input
                            type="text"
                            placeholder="Stad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
                            className="w-full px-3 py-2 rounded border border-gray-300"
                        >
                            <option value="USER">Användare</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 mb-8"
                        >
                            Skapa konto
                        </button>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default CreateAccount;
