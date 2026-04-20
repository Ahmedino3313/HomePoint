import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiSearch, HiFilter } from 'react-icons/hi';
import PropertyCard from '../components/PropertyCard';
import properties from '../data/properties';

const states = [...new Set(properties.map((p) => p.state))].sort();
const types = ['All', 'Studio', '1 Bedroom', '2 Bedroom'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low'];


function Properties() {
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [search, setSearch] = useState(initialSearch);
    const [selectedState, setSelectedState] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedState, selectedType, sortBy]);

  // Combine hardcoded + admin uploaded properties
    const adminProperties = useMemo (() => {
        try {
            return JSON.parse(localStorage.getItem('adminProperties') || '[]');
        } catch {
            return [];
        }
    }, []);

    const allProperties = useMemo (() => {
        return [...properties, ...adminProperties];
    }, [adminProperties]);

    const filtered = useMemo(() => {
        let result = [...allProperties];

        if (search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
            (p) =>
            p.title.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.state.toLowerCase().includes(q) ||
            p.address.toLowerCase().includes(q) ||
            p.stateCode.toLowerCase().includes(q) ||
            p.zipCode.includes(q)
        );
        }

        if (selectedState !== 'All') {
        result = result.filter((p) => p.state === selectedState);
        }

        if (selectedType !== 'All') {
        result = result.filter((p) => p.type === selectedType);
        }

        if (sortBy === 'Price: Low to High') {
        result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
        result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [search, selectedState, selectedType, sortBy, allProperties.length]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, currentPage]);
    
    return (
            <div
                className="min-h-screen pt-24 pb-16 px-4"
                style={{ backgroundColor: '#f8fafc' }}
            >
                <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <p
                        className="text-sm font-semibold tracking-widest uppercase mb-2"
                        style={{ color: '#2eac76' }}
                    >
                        Browse Listings
                    </p>
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: '#1a3a5c' }}
                    >
                        Find Your Perfect Apartment
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Explore our listings across all 50 states. Use the filters to narrow down your search.
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-col md:flex-row gap-3"
                >
                    {/* Search Input */}
                    <div className="flex items-center flex-1 gap-3 border border-gray-200 rounded-full px-4 py-2.5">
                        <HiSearch size={20} style={{ color: '#2eac76' }} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by city, state or address..."
                            className="bg-transparent outline-none w-full text-gray-700 text-sm"
                        />
                    </div>

                    {/* State Filter */}
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-700 outline-none cursor-pointer"
                        style={{ minWidth: '160px' }}
                    >
                        <option value="All">All States</option>
                        {states.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>

                {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: '#1a3a5c' }}
                    >
                        <HiFilter size={16} /> Filters
                    </button>
                </motion.div>

                    {/* Filters Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`flex flex-wrap items-center gap-3 mb-8 ${showFilters ? 'flex' : 'hidden md:flex'}`}
                    >
                        {/* Type Filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                            style={
                            selectedType === type
                                ? { backgroundColor: '#2eac76', color: 'white' }
                                : { backgroundColor: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }
                            }
                        >
                            {type}
                        </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <div className="ml-auto flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 outline-none cursor-pointer bg-white"
                        >
                            {sortOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-500 text-sm">
                        Showing <span className="font-semibold" style={{ color: '#1a3a5c' }}>{filtered.length}</span> properties
                    </p>
                    {(search || selectedState !== 'All' || selectedType !== 'All') && (
                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedState('All');
                                setSelectedType('All');
                            }}
                            className="text-sm font-medium cursor-pointer hover:underline transition"
                            style={{ color: '#2eac76' }}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Properties Grid */}
                <AnimatePresence>
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginated.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <HiLocationMarker size={60} className="mx-auto mb-4" style={{ color: '#d1d5db' }} />
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3a5c' }}>
                                No properties found
                            </h3>
                            <p className="text-gray-400">Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2 mt-12 flex-wrap"
                    >
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                            style={
                                currentPage === 1
                                ? { color: '#d1d5db', borderColor: '#e5e7eb', cursor: 'not-allowed' }
                                : { color: '#1a3a5c', borderColor: '#1a3a5c' }
                            }>
                                &larr; Prev
                        </button>

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            const isActive = page === currentPage;
                            const isNearCurrent = Math.abs(page - currentPage) <= 2;
                            const isEndPage = page === 1 || page === totalPages;

                            if (!isNearCurrent && !isEndPage) {
                                if (page === 2 || page === totalPages - 1) {
                                    return <span key={page} className="text-gray-400">...</span>;
                                }
                                return null;
                            }

                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className="w-9 h-9 rounded-full text-sm font-medium transition-all duration-300"
                                    style={
                                        isActive
                                        ? { backgroundColor: '#2eac76', color: 'white' }
                                        : { backgroundColor: 'white', color: '#6b7280', border: '1px solid #e5e7eb' }
                                    }
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                            style={
                                currentPage === totalPages
                                ? { color: '#d1d5db', borderColor: '#e5e7eb', cursor: 'not-allowed' }
                                : { color: '#1a3a5c', borderColor: '#1a3a5c' }
                            }
                        >
                            Next &rarr;
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Properties;