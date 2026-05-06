import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLocationMarker, HiSearch, HiFilter } from 'react-icons/hi';
import PropertyCard from '../components/PropertyCard';
import properties from '../data/properties';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

  // Combine hardcoded + admin uploaded properties
    const [supabaseProperties, setSupabaseProperties] = useState([]);

    useEffect(() => {
        const fetchSupabaseProperties = async () => {
            try {
                const { data: supabaseData, error } = await supabase
                    .from('properties')
                    .select('*')
                    .order('created_at', {ascending: false });
                if (error) throw error;
                // Normalize supabase snake_case to camelCase
                const normalized = (supabaseData || []).map((p) => ({
                    ...p,
                    stateCode: p.state_code,
                    zipCode: p.zip_code,
                    agentId: p.agent_id,
                    images: p.images || [],
                }));
                setSupabaseProperties(normalized);
            } catch (err) {
                console.error('Supabase fetch error:', err);
            }
        };
        fetchSupabaseProperties();
    }, []);

    // This prevents any ID collision between hardcoded and Supabase properties
    const allProperties = useMemo(() => {
        const hardcodedIds = new Set(properties.map((p) => String(p.id)));
        const uniqueSupabase = supabaseProperties.filter(
            (p) => !hardcodedIds.has(String(p.id))
        );
        return [...properties, ...uniqueSupabase];
    }, [supabaseProperties]);

    // Search
    const normalize = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // remove commas, symbols
        .replace(/\s+/g, " ")        // remove extra spaces
        .trim();
    };

    const filtered = useMemo(() => { 
    let result = [...allProperties];

    if (search.trim()) {
        const normalizedSearch = normalize(search);
        const words = normalizedSearch.split(" ");

        result = result.filter((p) => {
        const fullText = normalize(`
            ${p.title || ""}
            ${p.address || ""}
            ${p.city || ""}
            ${p.state || ""}
            ${p.stateCode || ""}
            ${p.zipCode || ""}
        `);

        // Exact phrase match (full address)
        if (fullText.includes(normalizedSearch)) return true;

        // Flexible word match (any order)
        return words.every((word) => fullText.includes(word));
        });
    }

    if (selectedState !== "All") {
        result = result.filter((p) => p.state === selectedState);
    }

    if (selectedType !== "All") {
        result = result.filter((p) => p.type === selectedType);
    }

    if (sortBy === "Price: Low to High") {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
        result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
    }, [search, selectedState, selectedType, sortBy, allProperties]);

      // page pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(start, start + ITEMS_PER_PAGE);
    }, [filtered, currentPage, ITEMS_PER_PAGE]);
    
    return (
        <>
        <SEO
            title="Browse Properties | HomePoint Properties"
            description="Search through hundreds of studio, one bedroom and two bedroom apartments across all 50 US states. Filter by state, type and price."
            url="https://homepointproperties.com/properties"
        />
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
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
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
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer"
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
                                    className="w-9 h-9 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
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
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer"
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
        </>
    );
}

export default Properties;