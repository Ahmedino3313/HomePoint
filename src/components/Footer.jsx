import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";

function Footer() {
    return (
        <footer style={{ backgroundColor: '#0f2340' }}>
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Colum 1 - Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <img 
                                src="/logo1.PNG"
                                alt="HomePoint Properties"
                                className="h-12 w-12 object-contain rounded-full" 
                            />
                            <span className="font-bold text-xl text-white">
                                HomePoint <span style={{ color: '#2eac76' }}>Properties</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your trusted real estate partner across all 50 states. Finding you the perfect studio, one bedroom, and two bedroom apartment.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {[
                                { icon: <FaFacebookF size={16} />, href: '#' },
                                { icon: <FaTwitter size={16} />, href: '#' },
                                { icon: <FaInstagram size={16} />, href: '#' },
                                { icon: <FaLinkedin size={16} />, href: '#' },
                            ].map((social, i) => (
                                <a 
                                key={i}
                                href={social.href}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                                style={{ backgroundColor: '#1a3a5c' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2eac76'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a3a5c'}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-5">Quick Links</h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { name: 'Home', path: '/'},
                                { name: 'Properties', path: '/properties'},
                                { name: 'Our Agents', path: '/agents'},
                                { name: 'Contact Us', path: '/contact'},
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - property Types */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-5">Property Types</h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                'Studio Apartments',
                                'One Bedroom Apartments',
                                'Two Bedroom Apartments',
                                'Featured Listings',
                                'New Arrivals',
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        to="/properties"
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 flex items-center gap-2"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: '#2eac76' }}
                                        />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-5">Contact Us</h3>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <HiLocationMarker size={18} style={{ color: '#2eac76' }} className="mt-0.5 shrink-0" />
                                <span className="text-gray-400 text-sm">
                                    1234 Property Lane, Suite 100 <br /> New York, NY 10001
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <HiPhone size={18} style={{ color: '#2eac76' }} className="shrink-0" />
                                <a href="tel:+14043884724" className="text-gray-400 text-sm hover:text-white transition-all duration-300">
                                    +1 (404) 322-4724
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <HiMail size={18} style={{ color: '#2eac76' }} className="shrink-0" />
                                <a href="mailto:info@homepointproperties.com" className="text-gray-400 text-sm hover:text-white transition-all duration-300">
                                    info@homepointproperties.com
                                </a>
                            </li>
                        </ul>

                        {/* Download Form */}
                        <a 
                            href="/pdf/rental-application-form.pdf"
                            download
                            className="inline-block mt-6 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Download Application Form
                        </a>
                    </div>

                </motion.div>
            </div>

            {/* Bottom Bar */}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-t px-4 py-5"
                style={{ borderColor: '#1a3a5c' }}
            >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} HomePoint Properties. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-white transition-all duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-all duration-300">Terms of Service</a>
                    </div>
                </div>
            </motion.div>

        </footer>
    );
}

export default Footer;