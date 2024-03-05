const express = require('express');
const axios = require('axios');
const sportifyRoute = express.Router();
require('dotenv').config();
const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

const getToken = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            params: {
                grant_type: 'client_credentials',
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.message);
        return null;
    }
}

sportifyRoute.get('/', async (req,res) => {
    const access_token = await getToken();
    res.send('You are successfully authenticated');
    console.log(access_token);
})

module.exports = sportifyRoute;