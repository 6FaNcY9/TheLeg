// Webhook response received from The Next Leg
import { firestore } from '../../db';
import { addDoc, collection } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
  const { imageUrl, content, messageId, } = req.body as any;
  //console.log(req.body);

  await addDoc(collection(firestore, 'imgs'), {
    imgUrl: imageUrl,
    createdAt: new Date(),
    content: content,
    messageId: messageId,
  });

  res.status(200).json({ name: 'John Doe' });
}
