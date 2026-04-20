import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu when route changes 
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Properties', path: '/properties' },
        { name: 'Agents', path: '/agents' },
        { name: 'Contact', path: '/contact'},
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md border-white/10 shadow-lg"
            style={{
                backgroundColor: isHome && !scrolled
                ? 'transparent'
                : 'rgba(26, 58, 92, 0.95)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo + Name */}
                    <Link to="/" className="flex items-center gap-3">
                        <img 
                            src="/logo.png"
                            alt="HomePoint Properties"
                            className="h-12 w-12 object-contain rounded-full"
                        />
                        <span className="font-bold text-xl tracking-wide text-white">
                            HomePoint{" "}
                            <span style={{ color: '#2eac76' }}> 
                                Properties
                            </span>
                        </span>
                    </Link>

                    {/* Dexktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-white font-medium transition-all duration-300 relative group"
                                style={location.pathname === link.path ? {color: '#2eac76' } : {}}>
                                {link.name}
                                <span
                                    className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300 w-0 group-hover:w-full"
                                    style={{ backgroundColor: '#2eac76' }} 
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white text-3xl focus:outline-none">
                            {isOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity:1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden backdrop-blur-md border-t border-white/20"
                        style={{ backgroundColor: 'rgba(28, 58, 92, 0.85)'}}>
                        
                        <div className="flex flex-col px-6 py-4 gap-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name}
                                    to={link.path}
                                    className="text-white font-medium text-lg transition-all duration-300 hover:pl-2"
                                    style={location.pathname === link.path ? {color: '#2eac76' } : {}}>
                                        {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;