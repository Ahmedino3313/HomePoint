import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiPhone, HiLocationMarker, HiSearch } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import agents from '../data/agents';
import SEO from '../components/SEO';

const fadeUp = {
    hidden: {opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 }},
};

function AgentCard({ agent, index }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
        >
            {/* Top Banner */}
            <div
                className="h-24 w-full"
                style={{
                    background: 'linear-gradient(135deg, #1a3a5c 0%, #2d7dd2 50%, #2eac76 100%)',
                }}
            />

            {/* Agent Photo */}
            <div className="px-6 -mt-12 pb-6 flex flex-col flex-1">
                <div className="relative mb-4">
                    <img 
                        src={agent.photo}
                        alt={agent.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a3a5c&color=fff&size=80`;
                        }}    
                    />
                    <div
                        className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                        style={{ backgroundColor: '#2eac76' }}
                    >
                        <MdVerified size={12} color="white" />
                    </div>
                </div>

                {/* Name & Title */}
                <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: '#1a3a5c' }}
                >
                    {agent.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{agent.title}</p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} style={{ color: '#f59e0b' }} />
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div
                        className="text-center p-2 rounded-xl"
                        style={{ backgroundColor: '#f8fafc' }}
                    >
                        <p className="font-bold text-lg" style={{ color: '#1a3a5c' }}>
                            {agent.listings || 0}
                        </p>
                        <p className="text-gray-400 text-xs">Listings</p>
                    </div>
                    <div
                        className="text-center p-2 rounded-xl"
                        style={{ backgroundColor: '#f8fafc' }}
                    >
                        <p className="font-bold text-lg" style={{ color: '#1a3a5c' }}>
                            {agent.experience}yrs
                        </p>
                        <p className="text-gray-400 text-xs">Experience</p>
                    </div>
                </div>

                {/* States */}
                <div className="flex items-start gap-2 mb-4">
                    <HiLocationMarker
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: '#2eac76' }}
                    />
                    <p className="text-gray-400 text-xs leading-relaxed">
                        {agent.states.join(', ')}
                    </p>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-2 mb-4">
                    <a 
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                        style={{ color: '#1a3a5c' }}
                    >
                        <HiPhone style={{ color: '#2eac76' }} size={14} />
                        {agent.phone}
                    </a>
                    <a 
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2 text-sm transition-all duration-300 hover:translate-x-1 min-w-0"
                        style={{ color: '#1a3a5c' }}
                    >
                        <HiOutlineEnvelope style={{ color: '#2d7dd2' }} size={20} className="shrink-0" />
                        <span className="truncate">{agent.email}</span>
                    </a>
                </div>

                {/* View Profile Button */}
                <Link 
                    to={`/agents/${agent.id}`}
                    className="mt-auto text-center py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: '#1a3a5c' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eac76'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a3a5c'}
                >
                    View Profile
                </Link>
            </div>
        </motion.div>
    );
}

function Agents() {

    const [search, setSearch] = useState('');

    const filtered = agents.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.states.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
        <SEO
            title="Our Expert Agents | HomePoint Properties"
            description="Meet our team of experienced real estate agents across the United States. Ready to help you find your perfect apartment."
            url="https://homepointproperties.com/agents"
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
                    className="text-center mb-12"
                >
                    <p 
                        className="text-sm font-semibold tracking-widest uppercase mb-2"
                        style={{ color: '#2eac76' }}
                    >
                        Our Team
                    </p>
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: '#1a3a5c' }}
                    >
                        Meet Our Expert Agents
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Our experience team of real estate professionals is here to help you find your perfect home across all 50 states.
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-md mx-auto mb-12"
                >
                    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm">
                        <HiSearch size={20} style={{ color: '#2eac76' }} />
                        <input 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, title or state..."
                            className="bg-transparent outline-none w-full text-gray-700 text-sm"
                        />
                    </div>
                </motion.div>

                {/* Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
                >
                    {[
                        {value: agents.length, label: 'Expert Agents' },
                        {value: agents.reduce((sum, agent) => sum + (Number(agent.listings) || 0), 0) + '+', label: 'Total Listings' },
                        {value: Math.max(...agents.map((a) => a.experience)) + 'yrs', label: 'Max Experience' },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                        >
                            <p
                                className="text-2xl font-bold"
                                style={{ color: '#1a3a5c' }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-gray-400 text-xs">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Agent Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filtered.map((agent, index) => (
                            <AgentCard key={agent.id} agent={agent} index={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        className="text-center py-20"
                    >
                        <p
                            className="text-xl font-bold mb-2"
                            style={{ color: '#1a3a5c'}}
                        >
                            No agents found
                        </p>
                        <p className="text-gray-400">Try a different search term</p>               
                </motion.div>
                )}
            </div>
        </div>
        </>
    );
}

export default Agents;