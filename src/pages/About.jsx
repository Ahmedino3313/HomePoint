import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi';
import { BsBuilding, BsPeopleFill } from 'react-icons/bs';
import { FaHandshake, FaStar, FaHeart, FaShieldAlt, FaLightbulb, FaUsers } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import agents from '../data/agents';
import SEO from '../components/SEO';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

function About() {
    return (
        <>
        <SEO
            title="About Us | HomePoint Properties"
            description="Learn about HomePoint Properties — our story, mission, values and the team behind America's trusted real estate platform across all 50 states."
            url="https://home-point-green.vercel.app/about"
        />

        <div className="bg-white">
            
            {/* Hero section */}
            <section
                className="relative pt-40 pb-24 px-4 text-center overflow-hidden"
                style={{ backgroundColor: '#1a3a5c' }}
            >
                {/* Background circles decoration */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
                    style={{ backgroundColor: '#2eac76', transform: 'translate(30%, -30%)' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
                    style={{ backgroundColor: '#2d7dd2', transform: 'translate(-30%, 30%)' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <p
                        className="text-sm font-semibold tracking-widest uppercase mb-4"
                        style={{ color: '#2eac76' }}
                    >
                        About HomePoint Properties
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        We Help Families Find
                        <span style={{ color: '#2eac76' }}> Home</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed text-justify">
                        Since our founding, HomePoint Properties has been dedicated to connecting people with their perfect apartments across all 50 United States. We believe everyone deserves a place they love to call home. With a strong commitment to professionalism, transparency, and customer satisfaction, we strive to make the apartment search process simple, stress-free, and rewarding for every client. Our team works closely with renters, families, students, and working professionals to provide quality housing options tailored to different lifestyles and budgets. At HomePoint Properties, we are passionate about helping people find safe, comfortable, and welcoming spaces where they can truly feel at home while building lasting relationships based on trust, reliability, and exceptional service.
                    </p>
                </motion.div>
            </section>
            
            {/* Our Story */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <p
                                className="text-sm font-semibold tracking-widest uppercase mb-3 text-center"
                                style={{ color: '#2eac76' }}
                            >
                                Our Story
                            </p>
                            <h2
                                className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-center"
                                style={{ color: '#1a3a5c' }}
                            >
                                How HomePoint Properties Started
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-4 text-justify">
                                HomePoint Properties was born from a simple idea — finding an apartment should be easy, transparent, and stress-free. Our founders experienced firsthand the frustration of searching for quality housing, dealing with unreliable listings, and navigating a complex rental market. Determined to create a better experience, they built HomePoint Properties with a mission to simplify the rental process and connect people with trusted housing opportunities across the United States. Since then, we have remained committed to providing accurate property listings, responsive customer support, and personalized assistance tailored to each client’s needs. We understand that finding a home is one of life’s most important decisions, which is why we focus on building trust, maintaining transparency, and ensuring every client feels confident and supported throughout their housing journey. At HomePoint Properties, our goal is not just to help people find apartments, but to help them discover places where they can truly feel comfortable, secure, and at home.
                            </p>
                            <p className="text-gray-500 leading-relaxed mb-4 text-justify">
                                We set out to build a platform that puts renters first. Starting with just a handful of listings in New York City, we've grown to cover all 50 states with thousands of verified properties — all in one place. Over the years, HomePoint Properties has become a trusted destination for renters searching for quality apartments, shared living spaces, and family homes that fit their lifestyle and budget. Our commitment to transparency, reliability, and customer satisfaction continues to drive everything we do. By combining modern technology with personalized support, we make it easier for clients to explore listings, connect with property managers, and secure housing with confidence. We are proud to help individuals, families, students, and professionals across the country find safe, comfortable, and welcoming places they can truly call home.
                            </p>
                            <p className="text-gray-500 leading-relaxed text-justify">
                                Today, HomePoint Properties is trusted by thousands of families across United States to find studio, one bedroom, and two bedroom apartments that truly feel like home. Our dedication to providing verified listings, reliable support, and a seamless rental experience has helped us build lasting relationships with renters from all walks of life. Whether assisting students, young professionals, growing families, or individuals relocating to a new city, we remain committed to making the apartment search process simple, transparent, and stress-free. At HomePoint Properties, we continue to focus on delivering quality housing solutions and exceptional service while helping people discover comfortable spaces where they can build lasting memories and feel genuinely at home.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {[
                                { icon: <BsBuilding size={32} />, value: '750+', label: 'Properties Listed', color: '#2eac76' },
                                { icon: <BsPeopleFill size={32} />, value: '20+', label: 'Expert Agents', color: '#2d7dd2' },
                                { icon: <HiLocationMarker size={32} />, value: '50', label: 'States Covered', color: '#f59e0b' },
                                { icon: <FaHandshake size={32} />, value: '1,700+', label: 'Happy Clients', color: '#8b5cf6' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                                        style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                                    >
                                        {stat.icon}
                                    </div>
                                    <p
                                        className="text-3xl font-bold mb-1"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Mission and Vision */}
            <section className="py-24 px-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p
                            className="text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ color: '#2eac76' }}
                        >
                            Mission & Vision
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold"
                            style={{ color: '#1a3a5c' }}
                        >
                            What Drives Us Forward
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            variants={fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="rounded-2xl p-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: '#1a3a5c' }}
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                                style={{ backgroundColor: '#2eac76', transform: 'translate(20%, -20%)' }}
                            />
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                                style={{ backgroundColor: '#2eac76' }}
                            >
                                <FaHeart size={24} color="white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-300 leading-relaxed text-justify">
                                To simplify the apartment search process by providing a trusted, transparent, and comprehensive platform that connects renters with quality properties across all 50 US states. We are committed to making every American's home-finding journey seamless, affordable, and stress-free. Through verified listings, responsive customer support, and personalized housing solutions, HomePoint Properties strives to create a reliable experience where clients can confidently explore and secure apartments that fit their lifestyle and budget. Our mission is centered on helping individuals and families find safe, comfortable, and welcoming homes while maintaining the highest standards of professionalism, integrity, and customer satisfaction across every stage of the rental process.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="rounded-2xl p-8 text-white relative overflow-hidden"
                            style={{ backgroundColor: '#2d7dd2' }}
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                                style={{ backgroundColor: 'white', transform: 'translate(20%, -20%)' }}
                            />
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                            >
                                <FaLightbulb size={24} color="white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-100 leading-relaxed text-justify">
                                To become America’s most trusted real estate platform — a place where every renter finds not just an apartment, but a true home. We envision a future where quality housing is accessible to everyone, everywhere, supported by technology, transparency, and a team that genuinely cares. At HomePoint Properties, we aim to redefine the rental experience by creating a platform built on trust, innovation, and customer satisfaction. Our vision is to empower individuals and families with easy access to verified housing opportunities while simplifying every step of the apartment search process. As we continue to grow nationwide, we remain committed to building lasting relationships, improving accessibility to quality homes, and delivering dependable services that help people feel confident, comfortable, and supported in finding the perfect place to call home.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Our Values  */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p
                            className="text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ color: '#2eac76' }}
                        >
                            Our Values
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold"
                            style={{ color: '#1a3a5c' }}
                        >
                            What We Stand For
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaShieldAlt size={28} />,
                                title: 'Trust & Transparency',
                                desc: 'Every listing on our platform is verified. We believe in honest communication with our clients, agents, and partners at every step.',
                                color: '#2eac76',
                                bg: '#e8f5ee',
                            },
                            {
                            icon: <FaHeart size={28} />,
                            title: 'Client First',
                            desc: 'Our clients are at the heart of everything we do. We listen, we care, and we go the extra mile to ensure every renter finds their perfect home.',
                            color: '#ef4444',
                            bg: '#fef2f2',
                            },
                            {
                            icon: <FaUsers size={28} />,
                            title: 'Community',
                            desc: 'We believe in building strong communities. Every home we help find strengthens a neighborhood and creates lasting relationships.',
                            color: '#2d7dd2',
                            bg: '#e8f0fb',
                            },
                            {
                            icon: <FaStar size={28} />,
                            title: 'Excellence',
                            desc: 'We hold ourselves to the highest standards in everything — from our listings to our customer service and our technology platform.',
                            color: '#f59e0b',
                            bg: '#fef3e8',
                            },
                            {
                            icon: <FaLightbulb size={28} />,
                            title: 'Innovation',
                            desc: 'We constantly evolve our platform with the latest technology to make the apartment search experience faster, smarter, and more enjoyable.',
                            color: '#8b5cf6',
                            bg: '#f0e8fb',
                            },
                            {
                            icon: <FaHandshake size={28} />,
                            title: 'Integrity',
                            desc: 'We do the right thing — always. Our agents, partners, and team operate with unwavering integrity in every transaction and interaction.',
                            color: '#1a3a5c',
                            bg: '#e8edf5',
                            },
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                                    style={{ backgroundColor: value.bg, color: value.color }}
                                >
                                    {value.icon}
                                </div>
                                <h3
                                    className="text-xl font-bold mb-3"
                                    style={{ color: '#1a3a5c' }}
                                >
                                    {value.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm text-justify">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Why Choose us */}
            <section className="py-24 px-4" style={{ backgroundColor: '#f8fafc' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                    >
                        <p
                            className="text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ color: '#2eac76' }}
                        >
                            Why Choose Us
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold"
                            style={{ color: '#1a3a5c' }}
                        >
                            The HomePoint Difference
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        {[
                            {
                            number: '01',
                            title: 'Nationwide Coverage',
                            desc: 'We are the only platform offering verified studio, one bedroom, and two bedroom apartments in all 50 US states — from New York to Hawaii, from Alaska to Florida.',
                            color: '#2eac76',
                            },
                            {
                            number: '02',
                            title: 'Verified Listings Only',
                            desc: 'Every single property on HomePoint is personally verified by our team. No fake listings, no outdated information — just accurate, up-to-date apartments ready to rent.',
                            color: '#2d7dd2',
                            },
                            {
                            number: '03',
                            title: 'Expert Local Agents',
                            desc: 'Our network of experienced agents are local experts in their markets. They provide personalized guidance to help you find the perfect home in your preferred location.',
                            color: '#f59e0b',
                            },
                            {
                            number: '04',
                            title: 'Simple Application Process',
                            desc: 'Our streamlined application process makes it easy to apply for any property. Download our form, fill it out, and submit to your preferred agent — it\'s that simple.',
                            color: '#8b5cf6',
                            },
                            {
                            number: '05',
                            title: '24/7 Customer Support',
                            desc: 'Our dedicated support team is always available to help you with any questions, concerns, or issues at any time of day or night.',
                            color: '#ef4444',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ x: 8 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-6"
                            >
                                <div
                                    className="text-4xl font-bold shrink-0 w-16 text-center"
                                    style={{ color: `${item.color}40` }}
                                >
                                    {item.number}
                                </div>
                                <div
                                    className="w-1 rounded-full shrink-0 self-stretch"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div>
                                    <h3
                                        className="text-xl font-bold mb-2"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Our Team */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p
                            className="text-sm font-semibold tracking-widest uppercase mb-3"
                            style={{ color: '#2eac76' }}
                        >
                            Our Team
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: '#1a3a5c' }}
                        >
                            Meet the People Behind HomePoint
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-justify">
                            Our team of dedicated real estate professionals is passionate about helping you find your perfect home. With years of experience in apartment leasing, property management, and customer service, our agents are committed to providing personalized support and reliable guidance throughout every stage of the rental process. We understand that every renter has unique needs and preferences, which is why we take the time to carefully match clients with housing options that fit their lifestyle, location preferences, and budget. At HomePoint Properties, we pride ourselves on professionalism, transparency, and responsiveness, ensuring that every client enjoys a smooth, stress-free, and rewarding experience while searching for a place they can truly call home.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {agents.slice(0, 8).map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 text-center"
                            >
                                <div className="h-20 w-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #1a3a5c 0%, #2d7dd2 50%, #2eac76 100%)',
                                    }}
                                />
                                <div className="px-5 -mt-10 pb-6">
                                    <img
                                        src={agent.photo}
                                        alt={agent.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-3"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1a3a5c&color=fff&size=80`;
                                        }}
                                    />
                                    <div className="flex justify-center mb-1">
                                        <MdVerified size={16} style={{ color: '#2eac76' }} />
                                    </div>
                                    <h3
                                        className="font-bold text-base mb-1"
                                        style={{ color: '#1a3a5c' }}
                                    >
                                        {agent.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs mb-3">{agent.title}</p>
                                    <div className="flex justify-center gap-1 mb-4">
                                        {[...Array(5)].map((_, s) => (
                                            <FaStar key={s} size={10} style={{ color: '#f59e0b' }} />
                                        ))}
                                    </div>
                                    <Link
                                        to={`/agents/${agent.id}`}
                                        className="block text-center py-2 rounded-full font-semibold text-white text-xs transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        style={{ backgroundColor: '#1a3a5c' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eac76'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a3a5c'}
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mt-10"
                    >
                        <Link
                            to="/agents"
                            className="inline-block px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#2d7dd2' }}
                        >
                            Meet All Our Agents
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            {/* Stats Strip */}
            <section className="py-16 px-4" style={{ backgroundColor: '#1a3a5c' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '750+', label: 'Properties Listed' },
                            { value: '50', label: 'States Covered' },
                            { value: '20+', label: 'Expert Agents' },
                            { value: '1,700+', label: 'Happy Clients' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <p
                                    className="text-4xl font-bold mb-2"
                                    style={{ color: '#2eac76' }}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-gray-300 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA */}
            <section className="py-24 px-4 bg-white text-center">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <p
                        className="text-sm font-semibold tracking-widest uppercase mb-3"
                        style={{ color: '#2eac76' }}
                    >
                        Ready to Start?
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        style={{ color: '#1a3a5c' }}
                    >
                        Find Your Perfect Home Today
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Browse our listings across all 50 states and find the apartment that feels like home.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/properties"
                            className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Browse Properties
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 border-2"
                            style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a3a5c';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#1a3a5c';
                            }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
        </>
    );
}

export default About;