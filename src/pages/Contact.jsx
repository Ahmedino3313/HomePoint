import { useState } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6} },
};

function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.name || !form.email || !form.subject || !form.message) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    phone: form.phone || 'Not provided',
                    subject: form.subject,
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSubmitted(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            console.error('EmailJS error:', err);
            setError('Something went wrong. Please try again or contact us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>    
        <SEO
            title="Contact Us | HomePoint Properties"
            description="Get in touch with HomePoint Properties. We're here to help you find your perfect apartment across all 50 US states."
            url="https://homepointproperties.info/contact"
        />
        <div 
            className="min-h-screen pt-24 pb-16 px-4"
            style={{ backgroundColor: '#f8fafc' }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div 
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-14"
                >
                    <p
                        className="text-sm font-semibold tracking-widest uppercase mb-2"
                        style={{ color: '#2eac76' }}
                    >
                        Get In Touch
                    </p>
                    <h1 
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: '#1a3a5c' }}
                    >
                        Contact Us
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Have a question or need help finding your perfect home? Our team is here to help you every step of the way.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Contact Info */}
                    <div className="lg:col-span-1 flex flex-col gap-6">

                        {/* Info Cards */}
                        {[
                            {
                                icon: <HiPhone size={22} />,
                                title: 'Phone',
                                value: '+1 (404) 388-4724',
                                sub: 'Mon - Fri, 9am - 6pm EST',
                                bg: '#e8f5ee',
                                color: '#2eac76',
                                href: 'tel:+14043884724',
                            },
                            {
                                icon: <HiMail size={22} />,
                                title: 'Email',
                                value: 'info@homepointproperties.com',
                                sub: 'We reply within 24 hours',
                                bg: '#e8f0fb',
                                color: '#2d7dd2',
                                href: 'mailto:info@homepointproperties.com',
                            },
                            {
                                icon: <HiLocationMarker size={22} />,
                                title: 'Office',
                                value: '823 2nd Avenue ',
                                sub: 'New York, NY 10035',
                                bg: '#fef3e8',
                                color: '#f59e0b',
                                href: null,
                            },
                            {
                                icon: <HiClock size={22} />,
                                title: 'Working Hours',
                                value: 'Monday - Friday',
                                sub: '9:00 AM - 6:00 PM EST',
                                bg: '#f0e8fb',
                                color: '#8b5cf6',
                                href: null,
                            },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                {item.href ? (
                                    <a 
                                        href={item.href}
                                        className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border-gray-100 transition-all duration-300 hover:shadow-md"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: item.bg, color: item.color }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-0.5">{item.title}</p>
                                            <p
                                                className="font-semibold text-sm"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {item.value}
                                            </p>
                                            <p className="text-gray-400 text-xs">{item.sub}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: item.bg, color: item.color }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-0.5">{item.title}</p>
                                            <p
                                                className="font-semibold text-sm"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                {item.value}
                                            </p>
                                            <p className="text-gray-400 text-xs">{item.sub}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Social Media */}
                        <motion.div 
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        >
                            <p
                                className="font-bold mb-4"
                                style={{ color: '#1a3a5c' }}
                            >
                                Follow Us
                            </p>
                            <div className="flex gap-3">
                                {[
                                    {icon: <FaFacebookF size={16} />, href: '#', color: '#1877f2'},
                                    {icon: <FaTwitter size={16} />, href: '#', color: '#1da1f2'},
                                    {icon: <FaInstagram size={16} />, href: '#', color: '#e1306c'},
                                    {icon: <FaLinkedinIn size={16} />, href: '#', color: '#0077b5'},
                                ].map((social, i) => (
                                    <a 
                                        key={i}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                        style={{ backgroundColor: social.color }}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Customer Support */}
                        <motion.div 
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="rounded-2xl p-5 text-white"
                            style={{ backgroundColor: '#1a3a5c'}}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <MdSupportAgent size={28} style={{ color: '#2eac76' }} />
                                <p className="font-bold text-lg">24/7 Support</p>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">
                                Our customer support team is always available to answer your questions and help you find your perfect home.
                            </p>
                            <a 
                                href="tel:+14043884724"
                                className="inline-block px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: '#2eac76' }}
                            >
                                Call Support Now
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Contact Form */}
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full py-16 text-center"
                            >
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl"
                                    style={{ backgroundColor: '#e8f5ee' }}
                                >
                                    ✔
                                </div>
                                <h2
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: '#1a3a5c' }}
                                >
                                    Message Sent!
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: '#2eac76' }}
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <h2
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: '#1a3a5c' }}
                                >
                                    Send Us a Message 
                                </h2>
                                <p className="text-gray-400 text-sm mb-8">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>

                                <div className="flex flex-col gap-5">
                                    
                                    {/* Name & Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                Full Name *
                                            </label>
                                            <input 
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400"
                                                style={{ color: '#1a3a5c' }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                Email Address *
                                            </label>
                                            <input 
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400"
                                                style={{ color: '#1a3a5c' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone & Subject */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                Phone Number
                                            </label>
                                            <input 
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400"
                                                style={{ color: '#1a3a5c' }}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                Subject *
                                            </label>
                                            <select 
                                                name="subject"
                                                value={form.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400 bg-white"
                                                style={{ color: '#1a3a5c' }}
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="property">Property Inquiry</option>
                                                <option value="agent">Agent Request</option>
                                                <option value="application">Application Help</option>
                                                <option value="support">General Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            className="block text-sm font-medium mb-2"
                                            style={{ color: '#1a3a5c' }}
                                        >
                                            Message *
                                        </label>
                                        <textarea 
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you ..."
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400 resize-none"
                                            style={{ color: '#1a3a5c' }}
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 p-4 rounded-xl text-sm font-medium"
                                            style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}
                                        >
                                            ⚠ {error}
                                        </motion.div>
                                    )}
                                    
                                    {/* Submit */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full py-4 rounded-full font-semibold text-white text-base transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                                        style={{ backgroundColor: '#2eac76' }}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contact;