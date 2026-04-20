import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiSearch, HiLocationMarker } from "react-icons/hi";
import { BsBuilding, BsPeopleFill } from "react-icons/bs";
import { MdVerified, MdSupportAgent } from "react-icons/md";
import { FaHandshake, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/properties?search=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto w-full px-4"
        >
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2">

                    {/* Input Section */}
                    <div className="flex items-center flex-1 gap-3 px-3">
                        <HiLocationMarker size={22} className="text-[#2eac76]" />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by city, state or address..."
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-6 w-px bg-gray-200 mx-2"></div>

                    {/* Button */}
                    <button
                    onClick={handleSearch}
                    className="bg-[#2eac76] text-white px-6 py-2 rounded-full font-medium hover:scale-105 hover:shadow-md transition-all duration-300"
                    >
                        <HiSearch size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// CountUp Component
function CountUp({ target, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current)  observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [started, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Fade in animiation 
const fadeUp = {
    hidden: {opacity: 0, y: 40 },
    visible: {opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section
                className="relative min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: 'url(/images/hero/hero3.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    paddingTop: '100px',
                }}>
                
                {/* Dark Overlay */}
                <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(26,58, 92, 0.70)' }} />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: '#2eac76' }}>
                            Welcome to HomePoint Properties
                    </motion.p>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
                    >
                        Find Your Perfect {" "}
                        <span style={{ color: '#2eac76' }}>Home</span>{" "}
                        Wherever You Are
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl mx-auto"
                    >
                        Discover studio, one bedroom, and two bedroom apartments in all 50 states.
                        Trusted by thousands of families across the United States.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            to="/properties"
                            className="px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Browse Properties
                        </Link>
                        <Link
                            to="/agents"
                            className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-white text-white hover:text-white"
                            style={{}}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#2eac76';
                                e.currentTarget.style.borderColor = '#2eac76';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.borderColor = 'white';
                            }}
                        >
                            Meet Our Agents
                        </Link>
                    </motion.div>

                    {/* Search Bar */}
                    <SearchBar />
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70"
                >
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Stats Strip */}
            <section style={{ backgroundColor: '#1a3a5c' }} className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <BsBuilding size={32} />, target: 500, suffix: '+', label: 'Properties Listed' },
                            { icon: <HiLocationMarker size={32} />, target: 50, suffix: '', label: 'States Covered' },
                            { icon: <BsPeopleFill size={32} />, target: 10, suffix: '+', label: 'Expert Agents' },
                            { icon: <FaHandshake size={32} />, target: 1200, suffix: '+', label: 'Happy Clients' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div style={{ color: '#2eac76' }}>{stat.icon}</div>
                                <div className="text-4xl font-bold text-white">
                                    <CountUp target={stat.target} suffix={stat.suffix} />
                                </div>
                                <div className="text-gray-300 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us  */}
            <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#2eac76' }}>
                            Why Choose Us
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1a3a5c' }}>
                            The HomePoint Difference
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <MdVerified size={40} />,
                                title: 'Verified Properties',
                                desc: 'Every listing is personally verified by our team to ensure accuracy and quality.',
                            },
                            {
                                icon: <MdSupportAgent size={40} />,
                                title: '24/7 Support',
                                desc: 'Our dedicated support team is always available to help you find your perfect home.',
                            },
                            {
                                icon: <HiLocationMarker size={40} />,
                                title: 'Nationwide Coverage',
                                desc: 'We cover all 50 US states with studio, one bedroom and two bedroom apartments.',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl p-8 shadow-lg text-center border border-gray-100"
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: '#e8f5ee', color: '#2eac76'}}>
                                        {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#1a3a5c' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fetured Properties  */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#2eac76' }}>
                            Our Listings
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1a3a5c' }}>
                            Featured Properties
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Browse our handpicked selection of premium apartments across the United States.
                        </p>
                    </motion.div>

                    {/* Placeholder Card  */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3,].map((i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ Once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -6 }}
                                className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
                            >
                                <div
                                    className="h-52 w-full"
                                    style={{ backgroundColor: '#e8f5ee' }}
                                />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className="text-xs font-semibold px-3 py-1 rounded-full"
                                            style={{ backgroundColor: '#e8f5ee', color:'#2eac76' }}
                                        >
                                            1 Bedroom
                                        </span>
                                        <span className="font-bold text-lg" style={{ color: '#1a3a5c' }}>
                                            $1,200/mo
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1" style={{color: '#1a3a5c' }}>
                                        Modern Apartment {i}
                                    </h3>
                                    <p className="text-gray-400 text-sm flex items-center gap-1">
                                        <HiLocationMarker style={{ color: '#2eac76' }} /> New York, NY
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/properties"
                            className="px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 inline-block"
                            style={{ backgroundColor: '#2d7dd2' }}
                        >
                            View All Properties
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Download Application Form  */}
            <section
                className="py-20 px-4"
                style={{ backgroundColor: '#1a3a5c' }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}>
                        
                        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#2eac76' }}>
                            Get Started
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Apply?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                            Download our application form, fill it out, and submit it to your preferred agent.
                            It's that simple!
                        </p>
                        <a 
                            href="/pdf/rental-application-form.pdf"
                            download
                            className="inline-block px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Download Application Form
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-20 px-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-14"
                    >
                        <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#2eac76' }}>
                            Testimonials
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1a3a5c' }}>
                            What Our Clients Say
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Johnson',
                                location: 'New York, NY',
                                review: 'HomePoint made finding my apartment so easy. The agents were professional and responsive throughout the whole process.',
                                stars: 5,
                            },
                            {
                                name: 'Marcus Williams',
                                location: 'Los Angeles, CA',
                                review: 'I found my dream studio apartment within a week. The listings are accurate and the team is incredibly helpful.',
                                stars: 5,
                            },
                            {
                                name: 'Emily Rodriguez',
                                location: 'Chicago, IL',
                                review: 'Best real estate experience I have ever had. Highly recommend HomePoint to anyone looking for a new home.',
                                stars: 5,
                            },
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.stars)].map((_, s) => (
                                        <FaStar key={s} style={{ color: '#f59e0b' }} />
                                    ))}
                                </div>
                                <p className="text-gray-500 leading-relaxed mb-6">"{t.review}"</p>
                                <div>
                                    <p className="font-bold" style={{ color: '#1a3a5c' }}>{t.name}</p>
                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                        <HiLocationMarker style={{ color: '#2eac76' }} /> {t.location}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section
                className="relative py-20 px-4 text-center"
                style={{
                    backgroundImage: 'url(/images/hero/hero4.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(26, 58, 92, 0.85)' }}
                />
                <div className="relative z-10">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Your New Home is{' '}
                            <span style={{ color: '#2eac76' }}>Waiting</span>
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                            Join thousands of happy families who found their perfect home with HomePoint Properties.
                        </p>
                        <Link
                            to="/properties"
                            className="inline-block px-10 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Start Your Search
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;