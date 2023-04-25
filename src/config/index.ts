const config = {
    apiEndpoint: 'http://localhost/api',
    defaultLanguage: 'de'
};

switch (process.env?.REACT_APP_ENV) {
    case 'production':
        config.apiEndpoint = 'https://couponpocket.app/api';
        break;
    case 'test':
        config.apiEndpoint = 'https://couponpocket.app/api';
        break;
    default:
        break;
}

export default config;