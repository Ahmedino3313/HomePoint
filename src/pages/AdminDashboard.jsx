import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiTrash, HiEye, HiEyeOff, HiLogout, HiHome, HiArrowLeft } from "react-icons/hi";
import { BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";
import agents from '../data/agents';
import { supabase } from '../lib/supabase'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: {duration: 0.5 } },
};

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
];

const STATE_CODES = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
    'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
    'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN',
    'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE',
    'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC',
    'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR',
    'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA',
    'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
};

function AdminDashboard() {
    const [authenticated, setAuthenticated] = useState(() => {
        return sessionStorage.getItem('adminAuth') === 'true';
    });
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [properties, setProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingProperties, setLoadingProperties] = useState(true);

    const [form, setForm] = useState({
        title: '',
        type: 'Studio',
        price: '',
        address: '',
        city: '',
        state: 'Alabama',
        zipCode: '',
        bedrooms: 0,
        bathrooms: 1,
        sqft: '',
        description: '',
        agentId: 1,
        featured: false,
        available: true,
    });

    // Fetch properties from Supabase
    const fetchProperties = async () => {
        setLoadingProperties(true);
        try {
            const { data, error } = await supabase 
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoadingProperties(false);
        }
    };

    useEffect(() => {
        if (authenticated) {
            fetchProperties();
        }
    }, [authenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setPasswordError('')
        } else {
            setPasswordError('Incorrect password. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'type' && {
                bedrooms: value === 'Studio' ? 0 : value === '1 Bedroom' ? 1 : 2,
            }),
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setImageFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const uploadImages = async (files) => {
        const urls = [];
        for (const file of files) {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
            const { data, error } = await supabase.storage
            .from('property-images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

            if (error) {
                console.error('Image upload error:', error);
                continue;
            }

            if (data?.path) {
                const { data: urlData } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(data.path);

                    urls.push(urlData.publicUrl);
            }
        }
        return urls;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!form.title || !form.price || !form.address || !form.city || !form.zipCode || !form.sqft || !form.description) {
            setErrorMsg('Please fill in all required fields.');
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return;
        }

        setUploading(true);

        try {
            // Upload images to Supabase Storage
            let imageUrls = [];
            if (imageFiles.length > 0) {
                imageUrls = await uploadImages(imageFiles);
            }

            // Fallback images if none uploaded
            if (imageUrls.length === 0) {
                imageUrls = [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
                    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
                    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                ];
            }

            // Insert Property into Supabase
            const { error } = await supabase.from('properties').insert({
                title: form.title,
                type: form.type,
                price: parseInt(form.price, 10),
                address: form.address,
                city: form.city,
                state: form.state,
                state_code: STATE_CODES[form.state],
                zip_code: form.zipCode,
                bedrooms: parseInt(form.bedrooms, 10),
                bathrooms: parseInt(form.bathrooms, 10),
                sqft: parseInt(form.sqft, 10),
                description: form.description,
                agent_id: parseInt(form.agentId, 10),
                featured: form.featured,
                available: form.available,
                images: imageUrls,
                posted_by: 'admin',
            });

            if ( error ) throw error;

            // Reset form
            setForm({
                title: '', type: 'Studio', price: '', address: '', city: '',
                state: 'Alabama', zipCode: '', bedrooms: 0, bathrooms: 1,
                sqft: '', description: '', agentId: 1, featured: false, available: true,
            });
            setImageFiles([]);
            setImagePreviews([]);
            setShowForm(false);
            setSuccessMsg('Property uploaded successfully!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setSuccessMsg (''), 4000);

            // Refresh properties list
            fetchProperties();
        } catch (err) {
            console.error('Submit error:', err);
            setErrorMsg('Something went wrong. Please try again');
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);
            
            if (error) throw error;
            setProperties((prev) => prev.filter((p) => p.id !== id ));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    // Login Screen
    if (!authenticated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ backgroundColor: '#f8fafc' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100"
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img 
                            src="/logo.png"
                            alt="HomePoint"
                            className="w-16 h-16 object-contain rounded-full mx-auto mb-4"
                        />
                        <h1
                            className="text-2xl font-bold"
                            style={{ color: '#1a3a5c' }}
                        >
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            HomePoint Properties
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#1a3a5c' }}
                            >
                                Admin Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                                    placeholder="Enter admin password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all duration-300 focus:border-green-400"
                                    style={{ color: '#1a3a5c' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300"
                                >
                                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                            {passwordError && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-xs mt-2"
                                >
                                    ⚠ {passwordError}
                                </motion.p>
                            )}
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                            style={{ backgroundColor: '#2eac76' }}
                        >
                            Login
                        </button>
                        <Link 
                            to="/"
                            className="text-center text-sm text-gray-400 flex items-center gap-2 hover:text-gray-600 transition-all duration-300"
                        >
                            <HiArrowLeft /> Back to Website
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Dashboard
    return (
        <div
            className="min-h-screen pt-8 pb-16 px-4"
            style={{ backgroundColor: '#f8fafc' }}
        >
            <div className="max-w-7xl mx-auto mt-24">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                >
                    <div className="flex items-center gap-4">
                        <img 
                            src="/logo.png"
                            alt="HomePoint"
                            className="w-12 h-12 object-contain rounded-full"
                        />
                        <div>
                            <h1 
                                className="text-2xl font-bold"
                                style={{ color: '#1a3a5c' }}
                            >
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Manage your property listings 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-500 transition-all duration-300 hover:border-green-400 hover:text-green-600 w-full sm:w-auto"
                        >
                            <HiHome size={16} /> View Site
                        </Link>
                        <button
                            onClick={() => {
                                setAuthenticated(false);
                                sessionStorage.removeItem('adminAuth');
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 w-full sm:w-auto cursor-pointer"
                            style={{ backgroundColor: '#1a3a5c' }}
                        >
                            <HiLogout size={16} /> Logout
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Uploaded', value: properties.length, color: '#2eac76' },
                        { label: 'Featured', value: properties.filter((p) => p.featured).length, color: '#2d7dd2' },
                        { label: 'Available', value: properties.filter((p) => p.available).length, color: '#f59e0b' },
                        { label: 'Agents', value: agents.length, color: '#8b5cf6' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center"
                        >
                            <p
                                className="text-3xl font-bold mb-1"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-gray-400 text-xs">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2"
                            style={{ backgroundColor: '#e8f5ee', color: '#2eac76' }}
                        >
                            ✔ {successMsg}
                        </motion.div>
                    )}
                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2"
                            style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}
                        >
                            ⚠ {errorMsg}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Property Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: '#1a3a5c' }}
                    >
                        Uploaded Properties ({properties.length})
                    </h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        style={{ backgroundColor: showForm ? '#ef4444' : '#2eac76' }}
                    >
                        <HiPlus size={16} />
                        {showForm ? 'Cancel' : 'Add Property'}
                    </button>
                </div>

                {/* Upload Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 overflow-hidden"
                        >
                            <h3
                                className="text-lg font-bold mb-6"
                                style={{ color: '#1a3a5c'}}
                            >
                                Add New Property
                            </h3>

                            <div className="flex flex-col gap-5">

                                {/* Title & Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Property Title *
                                        </label>
                                        <input 
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Modern Studio Apartment"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                            style={{ color: '#1a3a5c'}}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Property Type *
                                        </label>
                                        <select 
                                            name="type" 
                                            value={form.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 bg-white"
                                            style={{ color: '#1a3a5c'}}
                                        >
                                            <option value="Studio">Studio</option>
                                            <option value="1 Bedroom"> 1 Bedroom</option>
                                            <option value="2 Bedroom">2 Bedroom</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Price & sqft */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Monthly Rent ($) *
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="e.g. 1200"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                            style={{ color: '#1a3a5c' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Square Feet *
                                        </label>
                                        <input
                                            type="number"
                                            name="sqft"
                                            value={form.sqft}
                                            onChange={handleChange}
                                            placeholder="e.g. 650"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                            style={{ color: '#1a3a5c' }}
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                        Street Address *
                                    </label>
                                    <input 
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="e.g. 123 Main Street"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                        style={{ color: '#1a3a5c'}}
                                    />
                                </div>

                                {/* City, State, Zip */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            City *
                                        </label>
                                        <input 
                                            type="text"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder="e.g. New York"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                            style={{ color: '#1a3a5c'}}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            State *
                                        </label>
                                        <select 
                                            name="state" 
                                            value={form.state}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 bg-white"
                                            style={{ color: '#1a3a5c'}}
                                        >
                                            {US_STATES.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Zip Code *
                                        </label>
                                        <input 
                                            type="text"
                                            name="zipCode"
                                            value={form.zipCode}
                                            onChange={handleChange}
                                            placeholder="e.g. 10001"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400"
                                            style={{ color: '#1a3a5c'}}
                                        />
                                    </div>
                                </div>

                                {/* Bathrooms & Agent */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Bathrooms *
                                        </label>
                                        <select 
                                            name="bathrooms" 
                                            value={form.bathrooms}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 bg-white"
                                            style={{ color: '#1a3a5c'}}
                                        >
                                            <option value={1}>1 Bathroom</option>
                                            <option value={2}>2 Bathrooms</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                            Assign Agent *
                                        </label>
                                        <select 
                                            name="agentId" 
                                            value={form.agentId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 bg-white"
                                            style={{ color: '#1a3a5c'}}
                                        >
                                            {agents.map((a) => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                        Description *
                                    </label>
                                    <textarea 
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Describe the property..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm focus:border-green-400 resize-none"
                                        style={{ color: '#1a3a5c'}}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: '#1a3a5c' }}>
                                        Property Images (up to 5)
                                    </label>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm bg-white"
                                    />
                                    {imagePreviews.length > 0 && (
                                        <div className="flex gap-3 mt-3 flex-wrap">
                                            {imagePreviews.map((src, i) => (
                                                <div key={i} className="relative">
                                                    <img 
                                                        src={src}
                                                        alt={`Preview ${i + 1}`}
                                                        className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newPreviews = imagePreviews.filter((_, idx) => idx !== i);
                                                            const newFiles = imageFiles.filter((_, idx) => idx !== i);
                                                            setImagePreviews(newPreviews);
                                                            setImageFiles(newFiles);
                                                        }}
                                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition-all duration-300 hover:scale-110"
                                                        style={{ backgroundColor: '#ef4444' }}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Featured Toggle */}
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="checkbox"
                                        name="featured"
                                        id="featured"
                                        checked={form.featured}                                       
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-green-500"
                                    />
                                    <label 
                                        htmlFor="featured"
                                        className="text-sm font-medium cursor-pointer"
                                        style={{ color: '#1a3a5c'}}
                                    >
                                        Mark as Featured Property
                                    </label>
                                </div>

                                {/* Submit */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={uploading}
                                    className="w-full py-4 rounded-full font-semibold text-white text-base transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#2eac76' }}
                                >
                                    {uploading ? 'Uploading...' : 'Upload Property'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Properties List */}
                {loadingProperties ? (
                    <div className="flex justify-center py-20">
                        <div
                            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                            style={{ borderColor: '#2eac76', borderTopColor: 'transparent'}}
                        />
                    </div>
                ) : properties.length === 0 ? (
                    <motion.div 
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-center py-20 bg-white rounded-2xl border border-gray-100"
                    >
                        <BsBuilding size={60} className="mx-auto mb-4" style={{ color: '#d1d5db' }} />
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#1a3a5c' }}>
                            No properties uploaded yet
                        </h3>
                        <p className="text-gray-400">Click "Add Property" to upload your first listing</p>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {properties.map((property, i) => (
                            <motion.div 
                                key={property.id}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                                {/* Property Image */}
                                <div className="flex items-center gap-4 flex-1">
                                    <img 
                                        src={property.images?.[0]} 
                                        alt={property.title} 
                                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                                        onError={(e) => {
                                            e.target.style.backgroundColor = '#e8f5ee';
                                        }}
                                    />
                                    <div>
                                        <h3
                                            className="font-bold text-base"
                                            style={{ color: '#1a3a5c' }}
                                        >
                                            {property.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {property.address}, {property.city}, {property.state_code}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span
                                                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                                style={{ backgroundColor: "#e8f5ee", color: '#2eac76' }}
                                            >
                                                {property.type}
                                            </span>
                                            <span
                                                className="font-bold text-sm"
                                                style={{ color: '#2eac76' }}
                                            >
                                                ${property.price?.toLocaleString()}/mo
                                            </span>
                                            {property.featured && (
                                                <span
                                                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                                                    style={{ backgroundColor: '#1a3a5c' }}
                                                >
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        to={`/properties/${property.id}`}
                                        className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                                        style={{ backgroundColor: '#e8f0fb', color: '#2d7dd2' }}
                                    >
                                        <HiEye size={16} /> View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(property.id)}
                                        className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105"
                                        style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}
                                    >
                                        <HiTrash size={16} /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;