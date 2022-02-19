const config = {
    apiEndpoint: "https://app.couponpocket.de/api"
};

if (process.env.NODE_ENV !== 'production') {
    config.apiEndpoint = "http://localhost/api";
}

export default config;