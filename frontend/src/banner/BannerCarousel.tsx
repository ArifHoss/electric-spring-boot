import { useEffect, useState } from 'react';

const banners = [
    {
        id: 1,
        title: 'KÖP FLER, SPARA MER!',
        subtitle: 'Gäller vid köp av minst två utvalda vitvaror till köket',
        button: 'Se alla deals',
        image: '/ballet.png',
        offers: [
            { title: '2000:- Rabatt', detail: 'När du handlar för 10000' },
            { title: '4000:- Rabatt', detail: 'När du handlar för 20000' },
            { title: '6000:- Rabatt', detail: 'När du handlar för 30000' }
        ],
        color: 'bg-gradient-to-br from-[#001D4A] via-[#00316F] to-[#001D4A]'
    },
    {
        id: 2,
        title: 'SOMMARKAMPANJ!',
        subtitle: 'Fynda luftkonditionering & fläktar till nedsatt pris',
        button: 'Utforska kampanjen',
        image: '/air-conditioner.png',
        offers: [],
        color: 'bg-gradient-to-tr from-[#01345B] via-[#02557E] to-[#01345B]'
    },
    {
        id: 3,
        title: 'FÅ MER FÖR PENGARNA!',
        subtitle: 'Extra tillbehör på köpet när du köper utvalda tvättmaskiner',
        button: 'Se erbjudanden',
        image: '/washing-machine.png',
        offers: [],
        color: 'bg-gradient-to-bl from-[#012D48] via-[#00476B] to-[#012D48]'
    },
    {
        id: 4,
        title: 'BÄST I TEST - NU PÅ REA',
        subtitle: 'Topprankade kylskåp med upp till 30% rabatt',
        button: 'Kolla testvinnare',
        image: '/fridge-7.png',
        offers: [],
        color: 'bg-gradient-to-r from-[#001D4A] via-[#00316F] to-[#001D4A]'
    }
];

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(autoSlide);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="relative w-screen overflow-hidden h-[600px]">
            {banners.map((banner, idx) => (
                <article
                    key={banner.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                        idx === currentIndex
                            ? 'opacity-100 z-10'
                            : 'opacity-0 z-0'
                    } ${banner.color} text-white`}
                >
                    <div className="flex flex-col lg:flex-row justify-between items-center h-full px-6 lg:px-20 py-8 gap-8">
                        {/* Left Section: Text and CTA */}
                        <div className="text-left max-w-lg">
                            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
                                <span className="text-white">KÖP FLER,</span>{' '}
                                <br />
                                <span className="text-[#7CD038]">
                                    SPARA MER!
                                </span>
                            </h2>
                            <p className="mt-4 text-xl text-white opacity-90 leading-relaxed drop-shadow-sm">
                                {banner.subtitle}
                            </p>
                            <button className="mt-6 bg-[#7CD038] text-black text-lg font-bold px-6 py-2 rounded-full shadow-md hover:bg-lime-500 transition">
                                {banner.button}
                            </button>
                        </div>

                        {/* Middle Section: Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-[240px] sm:w-[300px] h-auto object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Right Section: Offers */}
                        <div className="space-y-6 text-right max-w-xs hidden lg:block">
                            {banner.offers.map((offer, i) => (
                                <div
                                    key={i}
                                    className="bg-[#002a66] rounded-full px-6 py-4 shadow-lg"
                                >
                                    <p className="text-3xl font-bold text-[#7CD038] leading-tight">
                                        {offer.title}
                                    </p>
                                    <p className="text-white text-lg">
                                        {offer.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            ))}

            {/* Dots navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {banners.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`w-3 h-3 rounded-full transition duration-300 ${
                            idx === currentIndex
                                ? 'bg-white scale-125'
                                : 'bg-gray-400 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerCarousel;
