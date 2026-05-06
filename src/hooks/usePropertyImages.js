import { useState, useEffect } from 'react';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const interiorQueries = [
    'modern apartment living room interior design',
    'luxury apartment bedroom interior',
    'contemporary apartment kitchen interior',
    'minimalist apartment interior decor',
    'cozy apartment living room furniture',
    'modern studio apartment interior design',
    'apartment dining room interior',
    'luxury bedroom interior design modern',
    'open plan apartment interior living',
    'scandinavian apartment interior design',
    'industrial apartment interior loft',
    'bright apartment interior white walls',
    'apartment interior natural light decor',
    'modern kitchen apartment interior design',
    'cozy bedroom apartment interior lighting',
    'apartment bathroom interior modern tiles',
    'contemporary living room interior sofa',
    'elegant apartment interior design decor',
    'urban apartment interior modern furniture',
    'apartment interior wood floor design',
];

const memoryCache = {};

const saveToStorage = (key, urls) => {
    try {
        const stored = JSON.parse(localStorage.getItem('propertyImages') || '{}');
        stored[key] = urls;
        localStorage.setItem('propertyImages', JSON.stringify(stored));
    } catch (err) {
        console.error('Storage save error:', err);
    }
};

const loadFromStorage = (key) => {
    try {
        const stored = JSON.parse(localStorage.getItem('propertyImages') || '{}');
        return stored[key] || null;
    } catch {
        return null;
    }
};

const fetchFromUnsplash = async (query) => {
    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error('Unsplash failed');
    return data.results.map((p) => p.urls.regular);
};

const fetchFromPexels = async (query) => {
    const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
        { headers: { Authorization: PEXELS_KEY } }
    );
    const data = await res.json();
    if (!data.photos || data.photos.length === 0) throw new Error('Pexels failed');
    return data.photos.map((p) => p.src.large);
};

const fetchFromPixabay = async (query) => {
    const res = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=8&category=interior`
    );
    const data = await res.json();
    if (!data.hits || data.hits.length === 0) throw new Error('Pixabay failed');
    return data.hits.map((p) => p.largeImageURL);
};

const fallbackSets = [
    [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
        'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    ],
    [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800',
        'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
    ],
    [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
        'https://images.unsplash.com/photo-1622866306950-81d17097d458?w=800',
        'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800',
    ],
];

export function usePropertyImages(type, id, city = '') {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const cacheKey = `${type}-${id}-${city}`;

    useEffect(() => {
        // if type is null skip fetching 
        if (!type) {
            setLoading(false);
            return;
        }

        // Check memory cache first
        if (memoryCache[cacheKey]) {
            setImages(memoryCache[cacheKey]);
            setLoading(false);
            return;
        }

        // Check localStorage
        const stored = loadFromStorage(cacheKey);
        if (stored) {
            memoryCache[cacheKey] = stored;
            setImages(stored);
            setLoading(false);
            return;
        }

        // 3. Stagger API calls based on property id
        const delay = (id % 5) * 400;

        const timer = setTimeout(async () => {
            try {
                const queryIndex = id % interiorQueries.length;
                const uniqueQuery = interiorQueries[queryIndex];

                let urls = [];

                const isLocalhost =
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1';

                const apiChoice = id % (isLocalhost ? 2 : 3);

                if (isLocalhost) {
                    if (apiChoice === 0) {
                        try { urls = await fetchFromUnsplash(uniqueQuery); }
                        catch { urls = await fetchFromPixabay(uniqueQuery); }
                    } else {
                        try { urls = await fetchFromPixabay(uniqueQuery); }
                        catch { urls = await fetchFromUnsplash(uniqueQuery); }
                    }
                } else {
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
                }

                const offset = (id * 3) % Math.max(urls.length, 1);
                const rotated = [...urls.slice(offset), ...urls.slice(0, offset)];
                const final = rotated.slice(0, 5);

                memoryCache[cacheKey] = final;
                saveToStorage(cacheKey, final);
                setImages(final);
            } catch (err) {
                console.error('All APIs failed:', err);
                const fallback = fallbackSets[id % fallbackSets.length];
                memoryCache[cacheKey] = fallback;
                saveToStorage(cacheKey, fallback);
                setImages(fallback);
            } finally {
                setLoading(false);
            }
        }, delay);

        return () => clearTimeout(timer);

    }, [cacheKey]);

    return { images, loading };

}