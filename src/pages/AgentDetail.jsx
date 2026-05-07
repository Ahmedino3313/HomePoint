import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiMail, HiLocationMarker, HiChevronLeft } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import agents from '../data/agents';
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AgentDetail() {
    const { id } = useParams();
    const [agent, setAgent] = useState(null);
    const [agentProperties, setAgentProperties] = useState([]);

    useEffect(() => {
        const loadAgent = async () => {
            const found = agents.find((a) => a.id === parseInt(id));
            if (found) {
            setAgent(found);

            // Fetch from Supabase
            const { data: supabaseData } = await supabase
                .from('properties')
                .select('*');

            const normalized = (supabaseData || []).map((p) => ({
                ...p,
                stateCode: p.state_code,
                zipCode: p.zip_code,
                agentId: p.agent_id,
            }));

            const allProperties = [...properties, ...normalized];
            const agentProps = allProperties.filter((p) => p.agentId === found.id);
            setAgentProperties(agentProps);
            }
        };

        loadAgent();
    }, [id]);

    if (!agent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 rounded-full animate-pulse mx-auto mb-4"
                        style={{ backgroundColor: '#e8f5ee' }}
                    />
                    <p style={{ color: '#1a3a5c' }} className="font-semibold">
                        Loading agent...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
        <SEO
            title={`${agent.name} | HomePoint Properties Agent`}
            description={`${agent.name} - ${agent.title}. ${agent.experience} years experience. ${agent.listings} listings across ${agent.states.join(', ')}.`}
            url={`https://home-point-green.vercel.app/agents/${agent.id}`}
        />
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
                        to="/agents"
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                        style={{ color: '#2eac76' }}
                    >
                        <HiChevronLeft size={20} /> Back to Agents
                    </Link>
                </motion.div>

                {/* Agent Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-12"
                >
                    {/* Banner */}
                    <div
                        className="h-48 w-full"
                        style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #2d7dd2 50%, #2eac76 100%)',}}
                    />

                    <div className="px-6 md:px-10 -mt-16 pb-10">
                        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">

                            {/* Photo */}
                            <div className="relative">
                                <img 
                                    src={agent.photo}
                                    alt={agent.name}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a3a5c&color=fff&size=112`;
                                    }}
                                />
                                <div
                                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                                    style={{ backgroundColor: '#2eac76' }}
                                >
                                    <MdVerified size={16} color="white" />
                                </div>
                            </div>

                            {/* Name & Info */}
                            <div className="flex-1">
                                <h1
                                    className="text-2xl md:text-3xl font-bold mb-1"
                                    style={{ color: '#1a3a5c' }}
                                >
                                    {agent.name}
                                </h1>
                                <p className="text-gray-400 mb-2">{agent.title}</p>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={14} style={{ color: '#f59e0b' }} />
                                    ))}
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a href={`tel:${agent.phone}`}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{ backgroundColor: '#2eac76' }}
                                >
                                    <HiPhone size={16} /> Call Agent
                                </a>
                                <a href={`mailto:${agent.email}`}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{ backgroundColor: '#2d7dd2' }}
                                >
                                    <HiMail size={16} /> Email Agent
                                </a>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {[
                                {label: 'Total Listings', value: agent.listings },
                                {label: 'Years Experience', value: `${agent.experience}yrs` },
                                {label: 'States Covered', value: agent.states.length },
                                {label: 'Rating', value: '5.0 ⭐' },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="text-center p-4 rounded-2xl border border-gray-100"
                                    style={{ backgroundColor: '#f8fafc' }}
                                >
                                    <p
                                        className="text-2xl font-bold mb-1"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-400 text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bio */}
                        <div className="mb-8">
                            <h2
                                className="text-xl font-bold mb-3"
                                style={{ color: '#1a3a5c' }}
                            >
                                About {agent.name}
                            </h2>
                            <p className="text-gray-500 leading-relaxed">{agent.bio}</p>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a 
                                href={`tel:${agent.phone}`}
                                className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: '#e8f5ee' }}
                            >
                                <HiPhone style={{ color: '#2eac76' }} size={20} />
                                <div>
                                    <p className="text-xs text-gray-400">Phone</p>
                                    <p
                                        className="font-medium text-sm"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {agent.phone}
                                    </p>
                                </div>
                            </a>
                            <a 
                                href={`mailto:${agent.email}`}
                                className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: '#e8f0fb' }}
                            >
                                <HiMail style={{ color: '#2d7dd2' }} size={20} className="shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <p
                                        className="font-medium text-sm break-all"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {agent.email}
                                    </p>
                                </div>
                            </a>
                            <div
                                className="flex items-center gap-3 p-4 rounded-2xl"
                                style={{ backgroundColor: '#fef3e8' }}
                            >
                                <HiLocationMarker style={{ color: '#f59e0b' }} size={20} />
                                <div>
                                    <p className="text-xs text-gray-400">States Covered</p>
                                    <p
                                        className="font-medium text-sm"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {agent.states.slice(0, 2).join(', ')}
                                        {agent.states.length > 2 && ` +${agent.states.length - 2} more`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Download Form */}
                        <div
                            className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 mt-5"
                            style={{ backgroundColor: '#1a3a5c' }}
                        >
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1">
                                    Ready to Apply?
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    Download the application form and send it directly to {agent.name}.
                                </p>
                            </div>
                            <a 
                                href="/pdf/rental-application-form.pdf"
                                download
                                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                style={{ backgroundColor: '#2eac76' }}
                            >
                                Download Application Form
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Agent Properties */}
                {agentProperties.length > 0 && (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <BsBuilding size={24} style={{ color: '#2eac76' }} />
                            <h2
                                className="text-2xl font-bold"
                                style={{ color: '#1a3a5c' }}
                            >
                                {agent.name}'s Listings ({agentProperties.length})
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {agentProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
        </>
    );
}

export default AgentDetail;