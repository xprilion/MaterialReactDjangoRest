const config = {
  apiEndpoint: 'https://api.svyper.co/',
  mediaEndpoint: 'https://storage.bunnycdn.com',
  staticEndpoint: 'https://static.svyper.co'
};

if (process.env.NODE_ENV !== 'production') {
  config.apiEndpoint = 'http://127.0.0.1:8000'
}

export default config;