'use client'; // this is a client component 👈🏽
//import axios from 'axios';
import { firestore } from '@/db';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostImageComponent from './components/imagine';
import gotMessageId from './components/imagine';
import GetMessageInfo from "@/pages/components/message";
import message from "@/pages/components/message";
import gotMessageID from "@/pages/components/imagine";
//import {log} from "util"; // Import the new component

const AUTH_TOKEN = '8e037a0a-d9c8-4ad0-9b81-1c099ca18ff3';
const endpoint = `https://api.thenextleg.io`;

interface IMGS {
  createdAt: any;
  content: string;
  messageId: string;
  imgUrl: string;
}

export default function Home() {
  const [imgs, setImgs] = useState<IMGS[]>([]);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [gotMessageId, setMessageId] = useState(''); // Add this line to create a state for messageId
  const [messageInfo, setMessageInfo] = useState();

  useEffect(() => {
    onSnapshot(collection(firestore, 'imgs'), snapshot => {
      let allImgs: IMGS[] = snapshot.docs.map(
          doc => doc.data(),
      ) as any;
      setImgs(allImgs);
    });
  }, []);

  return (
      <div className='container mx-auto h-screen flex flex-col items-center justify-center '>
        <div className='w-full mx-auto px-20'>
          <div>
            <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
            >
              Prompt
            </label>
            <div className='mt-2 flex space-x-2'>
              <PostImageComponent/>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-4xl py-8'>These are your images!</h1>
          <div className='grid grid-cols-3 gap-4'>
            {imgs.map(img => (
                <img
                    src={img.imgUrl}
                    className='w-full'
                    key={img.imgUrl}
                    alt='nothing'
                />
            ))}
          </div>
        </div>
      </div>
  );
}
