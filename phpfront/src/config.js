const config = {
  apiEndpoint: 'https://api.svyper.co/',
  mediaEndpoint: 'https://storage.bunnycdn.com',
  staticEndpoint: 'https://static.svyper.co'
};

if (process.env.NODE_ENV !== 'production') {
  config.apiEndpoint = 'http://54.151.152.77'
}

export default config;