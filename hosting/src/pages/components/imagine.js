import axios from 'axios';
import { useState } from 'react';

const PostImageComponent = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [gotMessageID, setMessageId] = useState('');

    const postImage = async () => {
        setLoading(true);
        const data = JSON.stringify({
            msg:text,
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.thenextleg.io/v2/imagine',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 8e037a0a-d9c8-4ad0-9b81-1c099ca18ff3' // replace with your actual token
            },
            data : data
        };

        try {
            const response = await axios.request(config);
            console.log(response.data);
            setResponse(response.data);
            setMessageId(response.data.messageId)
        } catch (error) {
            console.error(error);
        }
        setLoading(false);

    };

    return (
        <>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Enter your prompt here'
                />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={postImage}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {response && <div>{JSON.stringify(response)
                }</div>}
        </>
    );
};

export default PostImageComponent;
