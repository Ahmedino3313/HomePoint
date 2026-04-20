import { useState, useEffect } from 'react';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;


const typeQueryMap = {
    'Studio': 'studio apartment interior',
    '1 Bedroom': 'one bedroom apartment interior',
    '2 Bedroom': 'two bedroom apartment interior',
};

const cache = {};

const fetchFromUnsplash = async (query) => {
    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error('Unsplash failed');
    // Shuffle results for variety
    const shuffled = [...data.results].sort(() => Math.random() - 0.5);
    return shuffled.map((p) => p.urls.regular);
};

const fetchFromPexels = async (query) => {
    const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: PEXELS_KEY } }
    );
    const data = await res.json();
    if (!data.photos || data.photos.length === 0) throw new Error('Pexels failed');
    return data.photos.map((p) => p.src.large);
};

const fetchFromPixabay = async (query) => {
    const res = await fetch(
        `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=5&category=buildings`
    );
    const data = await res.json();
    if (!data.hits || data.hits.length === 0) throw new Error('Pixabay failed');
    return data.hits.map((p) => p.largeImageURL);
};

const fallbackImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
];

export function usePropertyImages(type, id, city = '', state = '') {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const cacheKey = `${type}-${id}-${city}`;

    useEffect(() => {
        if (cache[cacheKey]) {
        setImages(cache[cacheKey]);
        setLoading(false);
        return;
        }

    const fetchImages = async () => {
        try {
            // Each property gets a unique query using its type + city
            const baseQuery = typeQueryMap[type] || 'apartment interior';
            const uniqueQuery = city
            ? `${baseQuery} ${city}`
            : baseQuery;

            let urls = [];

            // Rotate between 3 APIs based on property id
            const apiChoice = id % 3;

            if (apiChoice === 0) {
            try { urls = await fetchFromUnsplash(uniqueQuery); }
            catch { 
                try { urls = await fetchFromPexels(uniqueQuery); }
                catch { urls = await fetchFromPixabay(uniqueQuery); }
            }
        } else if (apiChoice === 1) {
            try { urls = await fetchFromPexels(uniqueQuery); }
            catch {
                try { urls = await fetchFromUnsplash(uniqueQuery); }
                catch { urls = await fetchFromPixabay(uniqueQuery); }
            }
            } else {
            try { urls = await fetchFromPixabay(uniqueQuery); }
            catch {
                try { urls = await fetchFromUnsplash(uniqueQuery); }
                catch { urls = await fetchFromPexels(uniqueQuery); }
            }
        }

        const shuffled = [...urls].sort(() => Math.random() - 0.5);
        cache[cacheKey] = shuffled;
        setImages(shuffled);
    } catch (err) {
        console.error('All APIs failed:', err);
        const shuffled = [...fallbackImages].sort(() => Math.random() - 0.5);
        cache[cacheKey] = shuffled;
        setImages(shuffled);
    } finally {
        setLoading(false);
    }
    };

    fetchImages();
    }, [cacheKey]);

    return { images, loading };
}