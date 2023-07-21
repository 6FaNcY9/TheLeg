// File: upscaleImage.js
import axios from 'axios';

export const upscaleImage = async (buttonMessageId, button) => {
    const data = `{\r\n    "button": "${button}",\r\n    "buttonMessageId": "${buttonMessageId}"\r\n}`;
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.thenextleg.io/v2/button',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 8e037a0a-d9c8-4ad0-9b81-1c099ca18ff3`  },
        data : data
    };

    try {
        const response = await axios.request(config);
        console.log(response.data);
    } catch (err) {
        console.error(err.message);
    }
};
