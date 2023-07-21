// This is a client component
import {firestore} from '@/db';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import PostImageComponent from './components/imagine';
import {upscaleImage} from "@/pages/components/upscale";
//import sortImages from './components/images';

// Defines the structure for images
interface IMGS {
  createdAt: any;
  content: string;
  messageId: string;
  imgUrl: string;
  buttonMessageId: string;
  buttons: any;
  type: string;
}

export default function Home() {
  const [imgs, setImgs] = useState<IMGS[]>([]);
  //const fourHoursAgo = new Date().getTime() - 4 * 60 * 60 * 1000;

  // On component mount, start listening for changes in the 'imgs' collection
  useEffect(() => {
    const imgCollection = collection(firestore, 'imgs');
    const q = query(imgCollection, orderBy("createdAt", "desc"));

    // Whenever a change occurs, update the imgs state with the new set of images
    const unsubscribe = onSnapshot(q, snapshot => {
      let allImgs: IMGS[] = snapshot.docs.map(
          doc => ({ id: doc.id, ...doc.data() }),
      ) as any;
      setImgs(allImgs);
    });

    // Stop listening for changes when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
      <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800'>
        <header className='p-4 bg-blue-500 text-white'>
          <h1 className='text-2xl'>Admin Dashboard</h1>
        </header>

        <main className='flex-grow p-4 space-y-4'>
          <div className='border-b-4 border-blue-500 pb-4 mb-6 space-y-2'>
            <h2 className='text-lg font-bold text-blue-700 uppercase'>Actions</h2>
            <div className='grid grid-cols-2 gap-4'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Something</button>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Something</button>
            </div>
          </div>

          <div className='border-b-4 border-blue-500 pb-4 mb-6'>
            <h2 className='text-lg font-bold mb-2 text-blue-700 uppercase'>Prompt</h2>
            <div className='mt-2 flex space-x-2'>
              <PostImageComponent/>
            </div>
          </div>

          <div className='border-b-4 border-blue-500 pb-4 mb-6'>
            <h2 className='text-lg font-bold mb-2 text-blue-700 uppercase'>All Images</h2>
            <div className='grid grid-cols-3 gap-4'>
              {imgs
                  .filter(img => img.buttons)
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 12)
                  .map(img => (
                      <div key={img.messageId} className='flex flex-col bg-gray-800 shadow-lg rounded-lg overflow-hidden p-4'>
                        <div className='w-full h-64 overflow-hidden relative'>
                          <img src={img.imgUrl} className='w-full h-full object-contain object-center absolute' alt='Image'/>
                        </div>
                        <div className="flex-grow grid grid-cols-3 gap-2">
                          {img.buttons && img.buttons.map((button: string, index: number) => {
                            const isLastButton = index === img.buttons.length - 1 && img.type === 'button';
                            return (
                                <button
                                    key={index}
                                    className={`inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-2 rounded m-2 ${isLastButton ? 'col-start-2 col-end-3 justify-self-center' : ''}`}
                                    onClick={() => upscaleImage(img.buttonMessageId, button)}
                                >
                                  {button}
                                </button>
                            );
                          })}
                        </div>
                        <div className="bg-gray-900 text-white text-xs p-4 rounded-b">{img.content}</div>
                      </div>
                  ))}
            </div>
          </div>

        </main>

        <footer className='p-4 bg-blue-500 text-white text-center'>
          <p>© 2023 My Website</p>
        </footer>
      </div>
  );
  /*To achieve what you're asking for, you could introduce a new state variable in your component that holds an array of your responses. Each time you get a new response, append it to this array. Then, you could render this array as JSON in a pre and code HTML tags which preserve formatting and can be styled for syntax highlighting. I'll show you a simplified example since I don't have all the context of your component.

First, you need to install a syntax highlighter library. Since you're using React, react-syntax-highlighter is a good choice. You can install it using npm:

bash

npm install react-syntax-highlighter --save

Then, in your component, import the library and the style you want to use:

tsx

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

Then, in your component's state, add a new variable to store the responses:

tsx

const [responses, setResponses] = useState([]);

When you make your API requests, add the response to the responses array:

tsx

axios.request(config)
.then((response) => {
  setResponses(oldResponses => [...oldResponses, response]);
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

Finally, render the responses in your component using react-syntax-highlighter. Wrap it in a div with a fixed height and set overflow to auto to make it scrollable:

tsx

<div style={{ maxHeight: '200px', overflow: 'auto' }}>
  {responses.map((response, index) => (
    <SyntaxHighlighter language="json" style={solarizedlight} key={index}>
      {JSON.stringify(response, null, 2)}
    </SyntaxHighlighter>
  ))}
</div>

This is a simplified example, and you may need to adjust it according to your specific use case and code. If you could provide more context or share more of your code, I could give a more precise answer.*/
}