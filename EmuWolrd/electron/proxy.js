import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'

const app = express();
const PORT = 3000;
const API_KEY = 'pp64muquz7qralwxkppswl49qiu8ym'; // clé API IGDB
const API_ID = '7yuofk3njbfja2pl950sfu2sxiqoqf'; // client ID
const BASE_URL = 'https://api.igdb.com/v4/games'; // url to ask

app.use(cors()) //For bypass the CORS policy

// set up request form
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Client-ID');
    next();
});

//Send the request
app.use('/api', createProxyMiddleware({
    target: BASE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Client-ID', API_ID);
        proxyReq.setHeader('Authorization', `Bearer ${API_KEY}`);
    }
}))

//assure that app is started in console
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`)
})