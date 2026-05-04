import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFound() {
    return (
        <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: '#f8fafc' }}
        >
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <h1
                className="text-9xl font-bold mb-4"
                style={{ color: '#e8f5ee' }}
            >
                404
            </h1>
            <h2
                className="text-3xl font-bold mb-4"
                style={{ color: '#1a3a5c' }}
            >
                Page Not Found
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to="/"
                className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#2eac76' }}
            >
                Back to Home
            </Link>
            <Link
                to="/properties"
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 border-2"
                style={{ borderColor: '#1a3a5c', color: '#1a3a5c' }}
            >
                Browse Properties
            </Link>
            </div>
        </motion.div>
        </div>
    );
}

export default NotFound;