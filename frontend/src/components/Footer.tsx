import { Link } from 'react-router-dom';
import { GiReturnArrow, GiStorkDelivery } from 'react-icons/gi';
import { MdOutlinePriceCheck } from 'react-icons/md';

const menuItems = [
    {
        label: 'Boka & Hämta inom 30 min',
        to: '/demo',
        icon: <GiStorkDelivery />
    },
    {
        label: '50 dagars öppet köp för klubbmedlemmar',
        to: '/demo',
        icon: <GiReturnArrow />
    },
    { label: 'Prismatch', to: '/demo', icon: <MdOutlinePriceCheck /> }
];

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-sm text-gray-700 pt-12 px-6">
            {/* Top Benefits Row */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pb-10 border-b">
                {menuItems.map((item, idx) => (
                    <Link
                        to={item.to}
                        key={idx}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-md bg-green-100 hover:bg-gray-100 transition text-center"
                    >
                        <div className="text-5xl">{item.icon}</div>
                        <p className="text-lg font-semibold">{item.label}</p>
                    </Link>
                ))}
            </section>

            {/* Footer Links Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
                {/* Kundtjänst */}
                <div>
                    <h3 className="font-semibold mb-2">Kundtjänst</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/demo">Kundtjänst</Link>
                        </li>
                        <li>
                            <Link to="/demo">Hitta butik/varuhus</Link>
                        </li>
                        <li>
                            <Link to="/demo">Spåra din leverans</Link>
                        </li>
                        <li>
                            <Link to="/demo">Support via fjärrhjälp</Link>
                        </li>
                        <li>
                            <Link to="/demo">Bluffmail m.m.</Link>
                        </li>
                        <li>
                            <Link to="/demo">Kontakta oss</Link>
                        </li>
                    </ul>
                </div>
                {/* Information */}
                <div>
                    <h3 className="font-semibold mb-2">Information</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/demo">
                                Leverans- och installationsavtal
                            </Link>
                        </li>
                        <li>
                            <Link to="/demo">Cookies på Elgiganten</Link>
                        </li>
                        <li>
                            <Link to="/demo">Marketplace</Link>
                        </li>
                        <li>
                            <Link to="/demo">Personuppgiftspolicy</Link>
                        </li>
                        <li>
                            <Link to="/demo">Visselblåsning</Link>
                        </li>
                    </ul>
                </div>
                {/* Inspiration */}
                <div>
                    <h3 className="font-semibold mb-2">Inspiration</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/demo">Kampanjer</Link>
                        </li>
                        <li>
                            <Link to="/demo">Guider & inspiration</Link>
                        </li>
                        <li>
                            <Link to="/demo">Black Friday 2025</Link>
                        </li>
                        <li>
                            <Link to="/demo">Mellandagsrea 2025</Link>
                        </li>
                    </ul>
                </div>
                {/* Om Electric */}
                <div>
                    <h3 className="font-semibold mb-2">Om Electric</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/demo">Ledningsgrupp</Link>
                        </li>
                        <li>
                            <Link to="/demo">Jobba hos oss</Link>
                        </li>
                        <li>
                            <Link to="/demo">Elgiganten Foundation</Link>
                        </li>
                        <li>
                            <Link to="/demo">Elgiganten FöretagKundklubb</Link>
                        </li>
                        <li>
                            <Link to="/demo">Pressrum</Link>
                        </li>
                        <li>
                            <Link to="/demo">Hållbarhet</Link>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Bottom Note */}
            <div className="text-center py-4 text-xs text-gray-500">
                © {new Date().getFullYear()} Electric. Alla rättigheter
                förbehållna.
            </div>
        </footer>
    );
};

export default Footer;
