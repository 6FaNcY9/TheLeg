import axios from 'axios';
import {useEffect} from 'react';

export const upscaleImage = async (buttonMessageId, button) => {
    const data = `{\r\n    "button": "${button}",\r\n    "buttonMessageId": "${buttonMessageId}"\r\n}`;
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.thenextleg.io/v2/button',
        headers: { },
        data : data
    };

    try {
        const response = await axios.request(config);
        console.log(response.data);
    } catch (err) {
        console.error(err.message);
    }
};

// Dummy component
const Upscale = () => {
    useEffect(() => {
        console.log("Upscale component mounted");
    }, []);

    return null;
};

export default Upscale;
