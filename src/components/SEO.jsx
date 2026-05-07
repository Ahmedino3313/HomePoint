import { Helmet } from 'react-helmet-async';

function SEO({
    title = 'HomePoint Properties | Find a Place You\'ll Love',
    description = 'Discover studio, one bedroom, and two bedroom apartments across all 50 US states. Trusted by thousands of families. Find your perfect home with HomePoint Properties.',
    image = '/logo1.png',
    url = 'https://homepointproperties.com',
    type = 'website',
    }) {
    const fullTitle = title.includes('HomePoint') ? title : `${title} | HomePoint Properties`;

    return (
        <Helmet>
        {/* Primary Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />
        <meta name="keywords" content="apartments for rent, studio apartment, one bedroom apartment, two bedroom apartment, real estate, USA apartments, find apartment, HomePoint Properties" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="HomePoint Properties" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="HomePoint Properties" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Canonical */}
        <link rel="canonical" href={url} />
        </Helmet>
    );
}

export default SEO;