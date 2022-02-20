const config = {
    apiEndpoint: 'https://app.couponpocket.de/api',
    defaultLanguage: 'de'
};

if (process.env.NODE_ENV !== 'production') {
    config.apiEndpoint = 'http://localhost/api';
}

export default config;