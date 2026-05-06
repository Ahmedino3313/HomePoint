import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiHeart } from 'react-icons/hi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { BiArea } from 'react-icons/bi';
import { usePropertyImages } from '../hooks/usePropertyImages';

function LazyImage({src, alt }) {
    const [loaded, setLoaded] = useState(false);
    const [inView, setInView] =useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className="w-full h-full relative overflow-hidden">
            {/* Blur Placeholder */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 
                    ${loaded ? 'opacity-0' : 'opacity-100' }`}
                style={{
                    backgroundImage: inView && src ? `url(${src})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                    backgroundColor: '#e8f5ee',
                }}
            />
            {/* Real Image */}
            {inView && (
                <img
                    src={src}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 hover:scale-110 ${
                        loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                    }`}
                />
            )}
        </div>
    );
}

function PropertyCard({ property }) {
    const hasImages = property.images && property.images.length > 0;
    const { images: fetchedImages, loading } = usePropertyImages(
        hasImages ? null : property.type,
        property.id,
        property.city,
        property.state
    );
    const images = hasImages ? property.images : fetchedImages;
    const loading2 = hasImages ? false : loading;

    const [saved, setSaved] = useState(false);

    const typeColors = {
        'Studio': { bg: '#e8f5ee', text: '#2eac76' },
        '1 Bedroom': { bg: '#e8f0fb', text: '#2d7dd2' },
        '2 Bedroom': { bg: '#fef3e8', text: '#f59e0b' },
    };

    const color = typeColors[property.type] || typeColors['Studio'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                {loading2 || !images[0] ? (
                    <div
                        className="w-full h-full animate-pulse"
                        style={{ backgroundColor: '#e8f5ee' }}
                    />
                ) : (
                    <LazyImage
                        src={images[0]}
                        alt={property.title}
                    />
                )}

                {/* Type Badge */}
                <span
                    className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: color.bg, color: color.text }}
                >
                    {property.type}
                </span>

                {/* Save Button */}
                <button
                onClick={() => setSaved(!saved)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <HiHeart
                        size={16}
                        style={{ color: saved ? '#ef4444' : '#9ca3af' }}
                    />
                </button>

                {/* Featured Badge */}
                {property.featured && (
                    <span
                        className="absolute bottom-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: '#1a3a5c' }}
                    >
                        Featured
                    </span>
                )}
            </div>

                {/* Details */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3
                        className="font-bold text-base truncate"
                        style={{ color: '#1a3a5c' }}
                    >
                        {property.title}
                    </h3>
                    <span
                        className="font-bold text-base ml-2 shrink-0"
                        style={{ color: '#2eac76' }}
                    >
                        ${property.price.toLocaleString()}/mo
                    </span>
                </div>

                <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <HiLocationMarker style={{ color: '#2eac76' }} />
                    {property.address}, {property.city}, {property.stateCode}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-5 border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1">
                        <IoBedOutline style={{ color: '#2d7dd2' }} />
                        {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`}
                    </span>
                    <span className="flex items-center gap-1">
                        <IoWaterOutline style={{ color: '#2d7dd2' }} />
                        {property.bathrooms} Bath
                    </span>
                    <span className="flex items-center gap-1">
                        <BiArea style={{ color: '#2d7dd2' }} />
                        {property.sqft} sqft
                    </span>
                </div>

                <Link
                to={`/properties/${property.id}`}
                className="mt-auto text-center py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#1a3a5c' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eac76'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a3a5c'}
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
}

export default PropertyCard;