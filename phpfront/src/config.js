const config = {
  apiEndpoint: 'https://6aa133ffa113.ngrok.io'
};

if (process.env.NODE_ENV !== 'production') {
  config.apiEndpoint = 'https://6aa133ffa113.ngrok.io'
}

export default config;