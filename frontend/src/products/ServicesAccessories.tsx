import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';

const servicesList = [
    {
        title: 'Tjänster för Hem & Teknik',
        description:
            'Få hjälp med installation, montering och tekniksupport – i butik eller hemma hos dig.',
        image: '/money.png',
        link: '/demo'
    },
    {
        title: 'Datortjänster',
        description:
            'Kom igång med din dator – vi hjälper dig med installation, backup och säkerhet.',
        image: '/money.png',
        link: '/demo'
    },
    {
        title: 'Mobiltjänster',
        description:
            'Få hjälp med överföring av innehåll, uppdatering eller skärmskydd till mobilen.',
        image: '/money.png',
        link: '/demo'
    },
    {
        title: 'Tjänster för TV & Ljud',
        description:
            'Vi installerar och monterar din nya TV eller soundbar för en komplett upplevelse.',
        image: '/money.png',
        link: '/demo'
    },
    {
        title: 'Electric Cloud',
        description:
            'Säker molntjänst för backup av bilder, dokument och andra filer – alltid tillgängligt.',
        image: '/money.png',
        link: '/demo'
    },
    {
        title: 'Trygghetsavtal',
        description:
            'Skydda din produkt mot olyckor och oförutsedda händelser med vårt trygghetsavtal.',
        image: '/money.png',
        link: '/demo'
    }
];

const ServicesAccessories = () => {
    return (
        <section>
            <header className="px-6 py-10 text-center bg-gray-50">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    TJÄNSTER & TILLBEHÖR
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Vi hjälper dig hela vägen – före, under och efter köpet.
                    Välj bland våra tjänster för teknik, hemleverans,
                    installation och trygghet.
                </p>
            </header>

            <section className="px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesList.map((service, idx) => (
                    <Link
                        to={service.link}
                        key={idx}
                        className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md hover:bg-gray-50 transition"
                    >
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-20 h-20 object-contain mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                    </Link>
                ))}
            </section>

            <footer>
                <Footer />
            </footer>
        </section>
    );
};

export default ServicesAccessories;
