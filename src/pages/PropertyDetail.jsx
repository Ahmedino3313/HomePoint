import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLocationMarker, HiPhone, HiMail, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { FaDownload, FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import properties from '../data/properties';
import agents from '../data/agents';
import PropertyCard from '../components/PropertyCard';
import { usePropertyImages } from "../hooks/usePropertyImages";

// Image Slider Component
function ImageSlider({ type, id, city }) {
    const { images, loading } = usePropertyImages(type, id, city);
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const prev = () => {
        setDirection(-1);
        setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    };

    const next = () => {
        setDirection(1);
        setCurrent((c) => (c === images .length - 1 ? 0 : c + 1));
    };

    if (loading || images.length === 0) {
        return (
            <div 
                className="w-full h-96 rounded-2xl animate-pulse"
                style={{ backgroundColor: '#e8f5ee'}}
            />
        );
    }

    return (
        <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`Property image ${current + 1}`}
                    custom={direction}
                    variants={{
                        enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { x: 0, opacity: 1},
                        exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Prev Button */}
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
            >
                <HiChevronLeft size={22} style={{ color: '#1a3a5c' }} />
            </button>

            {/* Next Button */}
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
            >
                <HiChevronRight size={22} style={{ color: '#1a3a5c' }} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: i === current ? '20px' : '8px',
                            height: '8px',
                            backgroundColor: i === current ? '#2eac76' : 'rgba(255, 255, 255, 0.7)',
                        }}
                    />
                ))}
            </div>

            {/* Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10">
                {current + 1} / {images.length}
            </div>
        </div>
    );
}

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [agent, setAgent] = useState(null);
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        // Check hardcoded + admin properties
        const adminProperties = JSON.parse(localStorage.getItem('adminProperties') || '[]');
        const allProperties = [...properties, ...adminProperties];

        const found = allProperties.find((p) => p.id === parseInt(id));
        if (found) {
            setProperty(found);
            // Find agent
            const foundAgent = agents.find((a) => a.id === found.agentId);
            setAgent(foundAgent);
            // Find similar properties (same type, different id)
            const similarProps = allProperties
                .filter((p) => p.type === found.type && p.id !== found.id)
                .slice(0, 3);
            setSimilar(similarProps);
        }
    }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 rounded-full animate-pulse mx-auto mb-4"
                        style={{ backgroundColor: '#e8f5ee'}}
                    />
                    <p style={{ color: '#1a3a5c' }} className="font-semibold">
                        Loading property...
                    </p>
                </div>
            </div>
        );
    }

    const typeColors = {
        'Studio': {bg: '#e8f5ee', text: '#2eac76' },
        '1 Bedroom': {bg: '#e8f0fb', text: '#2d7dd2' },
        '2 Bedroom': {bg: '#fef3e8', text: '#f59e0b' },
    };
    const color = typeColors[property.type] || typeColors['Studio'];

    return (
        <div 
            className="min-h-screen pt-24 pb-16 px-4"
            style={{ backgroundColor: '#f8fafc' }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                >
                    <Link 
                        to="/properties"
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                        style={{ color: '#2eac76' }}
                    >
                        <HiChevronLeft size={20} /> Back to Properties
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-2">

                        {/* Image Slider */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ImageSlider
                                type={property.type}
                                id={property.id}
                                city={property.city}
                            />
                        </motion.div>

                        {/* Property Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 mt-6 shadow-sm border border-gray-100"
                        >
                            {/* Title Row */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span 
                                            className="text-xs font-semibold px-3 py-1 rounded-full"
                                            style={{ backgroundColor: color.bg, color: color.text }}
                                        >
                                            {property.type}
                                        </span>
                                        {property.featured && (
                                            <span
                                                className="text-xs font-semibold px-3 py-1 rounded-full text-white flex items-center gap-1"
                                                style={{ backgroundColor: '#1a3a5c' }}
                                            >
                                                <MdVerified size={12} /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <h1 
                                        className="text-2xl md:text-3xl font-bold"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {property.title}
                                    </h1>
                                </div>
                                <div className="text-right">
                                    <p
                                        className="text-3xl font-bold"
                                        style={{ color: '#2eac76' }}
                                    >
                                        ${property.price.toLocaleString()}
                                    </p>
                                    <p className="text-gray-400 text-sm">per month</p>
                                </div>
                            </div>

                            {/* Address */}
                            <p className="flex items-center gap-2 text-gray-500 mb-6">
                                <HiLocationMarker style={{ color: '#2eac76' }} size={18} />
                                {property.address}, {property.city}, {property.stateCode} {property.zipCode}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { icon: <IoBedOutline size={22} />, label: 'Bedrooms', value: property.bedrooms === 0 ? 'studio' : property.bedrooms },
                                    { icon: <IoWaterOutline size={22} />, label: 'Bathrooms', value: property.bathrooms},
                                    { icon: <BiArea size={22} />, label: 'Square Feet', value: `${property.sqft} sqft`},
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="text-center p-4 rounded-xl border border-gray-100"
                                    >
                                        <div
                                            className="flex justify-center mb-1"
                                            style={{ color: '#2d7dd2' }} 
                                        >
                                            {stat.icon}
                                        </div>
                                        <p
                                            className="font-bold text-lg"
                                            style={{ color: '#1a3a5c' }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-gray-400 text-xs">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div>
                                <h3 
                                    className="font-bold text-lg mb-3"
                                    style={{ color: '#1a3a5c' }} 
                                >
                                    About This Property
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {property.description}
                                </p>
                            </div>
                        </motion.div>

                        {/* Download Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 rounded-2xl p-6 text-white"
                            style={{ backgroundColor: '#1a3a5c' }}
                        >
                            <h3 className="font-bold text-xl mb-2">
                                Interested in This Property?
                            </h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Download the application form, fill it out and send it to the agent below.
                            </p>
                            <a 
                                href="/pdf/rental-application-form.pdf"
                                download
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                style={{ backgroundColor: '#2eac76' }}
                            >
                                <FaDownload size={14} /> Download Application Form
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column Agent Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-28"
                        >
                            <h3 
                                className="font-bold text-lg mb-5"
                                style={{ color: '#1a3a5c' }}
                            >
                                Listed By
                            </h3>

                            {agent ? (
                                <>
                                    {/* Agent Photo  */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="relative">
                                            <img 
                                                src={agent.photo}
                                                alt={agent.name}
                                                className="w-16 h-16 rounded-full object-cover border-2"
                                                style={{ borderColor: '#2eac76' }}
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a3a5c&color=fff&size=64`;
                                                }}
                                            />
                                            <div 
                                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                                                style={{ backgroundColor: '#2eac76' }}
                                            >
                                                <MdVerified size={10} color="white" />
                                            </div>
                                        </div>
                                        <div>
                                            <p 
                                                className="font-bold"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {agent.name}
                                            </p>
                                            <p className="text-gray-400 text-sm">{agent.title}</p>
                                            <div className="flex gap-0.5 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} size={10} style={{ color: '#f59e0b' }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <div
                                            className="text-center p-3 rounded-xl"
                                            style={{ backgroundColor: '#f8fafc' }}
                                        >
                                            <p
                                                className="font-bold text-xl"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {agent.listings}
                                            </p>
                                            <p className="text-gray-400 text-xs">Listings</p>
                                        </div>
                                        <div 
                                            className="text-center p-3 rounded-xl"
                                            style={{ backgroundColor: '#f8fafc'}}
                                        >
                                            <p
                                                className="font-bold text-xl"
                                                style={{ color: '#1a3a5c'}}
                                            >
                                                {agent.experience}yrs
                                            </p>
                                            <p className="text-gray-400 text-xs">Experience</p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                        {agent.bio}
                                    </p>

                                    {/* Contact */}
                                    <div className="flex flex-col gap-3 mb-5">
                                        <a 
                                            href={`tel:${agent.phone}`}
                                            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                                            style={{ backgroundColor: '#e8f5ee' }}
                                        >
                                            <HiPhone style={{ color: '#2eac76' }} size={18} />
                                            <span
                                                className="text-sm font-medium "
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {agent.phone}
                                            </span>
                                        </a>
                                        <a 
                                            href={`mailto:${agent.email}`}
                                            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                                            style={{ backgroundColor: '#e8f0fb' }}
                                        >
                                            <HiMail style={{ color: '#2d7dd2' }} size={18} />
                                            <span
                                                className="text-sm font-medium truncate"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {agent.email}
                                            </span>
                                        </a>
                                    </div>

                                    {/* View Agent Profile */}
                                    <Link
                                        to={`/agents/${agent.id}`}
                                        className="block text-center py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        style={{ backgroundColor: '#1a3a5c' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eac76'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a3a5c'}
                                    >
                                        View Agent Profile
                                    </Link>
                                </>
                            ) : (
                                <p className="text-gray-400 text-sm">Agent information not available.</p>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similar.length > 0 && (
                    <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-16"
                        >
                            <h2
                                className="text-2xl font-bold mb-8"
                                style={{color: '#1a3a5c' }}
                            >
                                Similar Properties
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {similar.map((p) => (
                                    <PropertyCard key={p.id} property={p} />
                                ))}
                            </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default PropertyDetail;