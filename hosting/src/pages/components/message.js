import React, { useEffect, useState } from 'react';
const endpoint = `https://api.thenextleg.io`;
import gotMessageID from '../imagine.js';

const GetMessageInfo = ({ messageId }) => {
    const [messageInfo, setMessageInfo] = useState(gotMessageID);

    useEffect(() => {
        // Fetch the message info when the component mounts
        fetch(`${endpoint}/message/${messageId}`)
            .then(response => response.json())
            .then(data => setMessageInfo(data))
            .catch(error => console.error(error));
    }, [messageId]); // Only re-run the effect if messageId changes

    return (
        <div className="message-info">
            {messageInfo ? (
                <p>{messageInfo.text}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default GetMessageInfo;
