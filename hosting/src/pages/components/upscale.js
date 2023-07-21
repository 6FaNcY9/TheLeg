import {useEffect, useState} from "react";
import axios from "axios";

const UpscaleImage = ({ buttonMessageId, button }) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const upscaleImage = async () => {
            // Configuration for the request
            const data = `{\r\n    "button": "${button}",\r\n    "buttonMessageId": "${buttonMessageId}"\r\n}`;
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.thenextleg.io/v2/button',
                headers: { },
                data : data
            };

            setLoading(true);
            try {
                const response = await axios.request(config);
                setResponse(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        upscaleImage();
    }, [button, buttonMessageId]); // Pass the dependencies to the useEffect hook

    return (
        <div>
            {loading && <p>Loading...</p>}
            {response && <p>Response: {JSON.stringify(response)}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default UpscaleImage;
