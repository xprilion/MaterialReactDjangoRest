const config = {
  apiEndpoint: 'https://api.svyper.co/',
  mediaEndpoint: 'https://storage.bunnycdn.com',
  staticEndpoint: 'https://static.svyper.co'
};

if (process.env.NODE_ENV !== 'production') {
  config.apiEndpoint = 'https://6aa133ffa113.ngrok.io'
}

export default config;