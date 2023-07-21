'use client'; // this is a client component 👈🏽
//import axios from 'axios';
import {firestore} from '@/db';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import PostImageComponent from './components/imagine';
import UpscaleImage from "@/pages/components/upscale";
import Image from 'next/image'
//import message from "@/pages/components/message";
//import {log} from "util"; // Import the new component

//const AUTH_TOKEN = '8e037a0a-d9c8-4ad0-9b81-1c099ca18ff3';
//const endpoint = `https://api.thenextleg.io`;

interface IMGS {
  createdAt: any;
  content: string;
  messageId: string;
  imgUrl: string;
  buttonMessageId: string;
  buttons: any;
}

export default function Home() {
  const [imgs, setImgs] = useState<IMGS[]>([]);
  //const [error, setError] = useState('');
  //const [response, setResponse] = useState('');

  useEffect(() => {
    const imgCollection = collection(firestore, 'imgs');
    const q = query(imgCollection, orderBy("createdAt", "desc")); // Orders by "createdAt" in descending order

    const unsubscribe = onSnapshot(q, snapshot => {
      let allImgs: IMGS[] = snapshot.docs.map(
          doc => ({ id: doc.id, ...doc.data() }),
      ) as any;
      setImgs(allImgs);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
      <div className='flex flex-col min-h-screen'>
        <header className='p-4 bg-gray-700 text-white'>
          <h1 className='text-xl'>Admin Dashboard</h1>
        </header>

        <main className='flex-grow p-4'>
          <div className='w-full mx-auto'>

            <div className='border-b-4 border-gray-800 rounded-sm pb-4 mb-6'>
              <label htmlFor='email' className='block text-lg font-bold mb-2 text-blue-700 uppercase'>
                Actions
              </label>
              <div className='grid grid-cols-4 gap-2 mb-2'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Something
                </button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Something
                </button>
              </div>
            </div>

            <div className='border-b-4 border-gray-800 rounded-sm pb-4 mb-6'>
              <label htmlFor='email' className='block text-lg font-bold mb-2 text-blue-700 uppercase'>
                Prompt
              </label>
              <div className='mt-2 flex space-x-2'>
                <PostImageComponent/>
              </div>
            </div>

            <div className='border-b-4 border-gray-800 rounded-sm pb-4 mb-6'>
              <label htmlFor='email' className='block text-lg font-bold mb-2 text-blue-700 uppercase'>
                All Images
              </label>
              <div className='grid grid-cols-4 gap-4'>
                {imgs.filter(img => img.buttons).sort((a,b) => b.createdAt - a.createdAt).map(img => (                    <div key={img.messageId} className='bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
                      <Image src={img.imgUrl} className='w-full h-64 object-contain' alt='Image'/>
                      <div className='p-4'>
                        {img.buttons && img.buttons.map((button: string, index: number) => (
                            <button
                                key={index}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                onClick={() => <UpscaleImage buttonMessageId={img.buttonMessageId} button={button} />}
                            >
                              {button}
                            </button>
                        ))}
                        <p className='text-white text-center'>{img.content}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <footer className='p-4 bg-gray-700 text-white text-center'>
          <p>© 2023 My Website</p>
        </footer>
      </div>
  );
}
